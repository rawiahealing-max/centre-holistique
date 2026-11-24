-- Automatic e-mails (sent 24/7 by the edge function "send-emails", every 5 min via pg_cron)
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;

alter table public.bookings add column if not exists email text;

create table if not exists public.email_queue (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  ref text not null,
  to_email text not null,
  lang text default 'ar',
  data jsonb not null default '{}'::jsonb,
  send_after timestamptz not null default now(),
  sent_at timestamptz,
  cancelled boolean not null default false,
  attempts int not null default 0,
  error text,
  unique (kind, ref)
);
create index if not exists email_queue_due on public.email_queue (send_after) where sent_at is null and not cancelled;
alter table public.email_queue enable row level security;
drop policy if exists "email_queue admin" on public.email_queue;
create policy "email_queue admin" on public.email_queue for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.email_queue from anon;

insert into public.app_secrets(key,value) values ('cron_secret', encode(extensions.gen_random_bytes(24),'hex')) on conflict (key) do nothing;
insert into public.app_secrets(key,value) values ('admin_email', 'rawiahealing@gmail.com') on conflict (key) do nothing;

create or replace function public.mail_enqueue(p_kind text, p_ref text, p_to text, p_lang text, p_data jsonb, p_after timestamptz default now())
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_to is null or p_to !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then return; end if;
  insert into email_queue(kind, ref, to_email, lang, data, send_after)
  values (p_kind, p_ref, lower(trim(p_to)), coalesce(nullif(p_lang,''),'ar'), coalesce(p_data,'{}'::jsonb), greatest(p_after, now()))
  on conflict (kind, ref) do nothing;
end $$;
revoke all on function public.mail_enqueue(text,text,text,text,jsonb,timestamptz) from public, anon, authenticated;

-- orders: new order → client + Rawia ; paid → client confirmation (+ appointment reminder)
create or replace function public.mail_orders() returns trigger language plpgsql security definer set search_path = public as $$
declare b bookings; adm text := (select value from app_secrets where key='admin_email'); d jsonb;
begin
  if new.booking_id is not null then select * into b from bookings where id = new.booking_id; end if;
  d := jsonb_build_object('order_id', new.id, 'name', new.name, 'phone', new.phone, 'email', new.email, 'items', new.items, 'total', new.total, 'note', new.note,
                          'start_at', b.start_at, 'service', b.service, 'mode', b.mode, 'meeting_url', new.meeting_url);
  if tg_op = 'INSERT' then
    perform mail_enqueue('order_new', new.id::text, new.email, new.lang, d);
    perform mail_enqueue('admin_order', new.id::text, adm, 'ar', d);
  elsif new.status = 'paid' and old.status is distinct from 'paid' then
    perform mail_enqueue('order_paid', new.id::text, new.email, new.lang, d);
    if b.id is not null then
      perform mail_enqueue('booking_reminder', b.id::text, coalesce(b.email, new.email), new.lang, d || jsonb_build_object('booking_id', b.id), b.start_at - interval '24 hours');
    end if;
  end if;
  return new;
end $$;
drop trigger if exists orders_mail on public.orders;
create trigger orders_mail after insert or update of status on public.orders for each row execute function public.mail_orders();

-- appointments added by hand in the admin (WhatsApp clients) → confirmation + reminder ; any new booking → Rawia
create or replace function public.mail_bookings() returns trigger language plpgsql security definer set search_path = public as $$
declare adm text := (select value from app_secrets where key='admin_email'); d jsonb;
begin
  if new.kind <> 'client' then return new; end if;
  d := jsonb_build_object('booking_id', new.id, 'name', new.name, 'phone', new.phone, 'start_at', new.start_at, 'service', new.service, 'mode', new.mode, 'note', new.note, 'source', new.source);
  if tg_op = 'INSERT' and new.source = 'admin' then
    null; -- Rawia added it herself, no notification to her
  elsif tg_op = 'INSERT' then
    perform mail_enqueue('admin_booking', new.id::text, adm, 'ar', d);
  end if;
  if new.status = 'confirmed' and (tg_op = 'INSERT' or old.status is distinct from 'confirmed') and new.source = 'admin' and new.email is not null then
    perform mail_enqueue('booking_confirmed', new.id::text, new.email, 'ar', d);
    perform mail_enqueue('booking_reminder', new.id::text, new.email, 'ar', d, new.start_at - interval '24 hours');
  end if;
  return new;
end $$;
drop trigger if exists bookings_mail on public.bookings;
create trigger bookings_mail after insert or update of status on public.bookings for each row execute function public.mail_bookings();

-- free live 10 Dec 2026 20:00 Tunis: reminders the day before and 1 h before
create or replace function public.mail_live() returns trigger language plpgsql security definer set search_path = public as $$
declare d jsonb := jsonb_build_object('name', new.name, 'event', new.event);
begin
  if new.event = 'live-2026-12-10' then
    perform mail_enqueue('live_day_before', new.id::text, new.email, new.lang, d, timestamptz '2026-12-09 20:00+01');
    perform mail_enqueue('live_1h', new.id::text, new.email, new.lang, d, timestamptz '2026-12-10 19:00+01');
  end if;
  return new;
end $$;
drop trigger if exists live_mail on public.live_registrations;
create trigger live_mail after insert on public.live_registrations for each row execute function public.mail_live();
-- people already registered
select public.mail_enqueue('live_day_before', id::text, email, lang, jsonb_build_object('name', name, 'event', event), timestamptz '2026-12-09 20:00+01') from public.live_registrations where event = 'live-2026-12-10';
select public.mail_enqueue('live_1h', id::text, email, lang, jsonb_build_object('name', name, 'event', event), timestamptz '2026-12-10 19:00+01') from public.live_registrations where event = 'live-2026-12-10';

-- every 5 minutes: wake the sender
select cron.unschedule('send-emails') where exists (select 1 from cron.job where jobname = 'send-emails');
select cron.schedule('send-emails', '*/5 * * * *', $c$
  select net.http_post(
    url := 'https://mhhzppszrqzjktqlgqag.supabase.co/functions/v1/send-emails',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select value from public.app_secrets where key='cron_secret')),
    body := '{}'::jsonb, timeout_milliseconds := 55000)
  where exists (select 1 from public.email_queue where sent_at is null and not cancelled and send_after <= now() and attempts < 5);
$c$);
