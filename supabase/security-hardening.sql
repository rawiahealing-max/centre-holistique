-- Centre Holistique — step 6: security hardening (applied 2026-11-23)
-- 1) Website roles never need TRUNCATE / TRIGGER / REFERENCES (TRUNCATE ignores row security)
revoke truncate, trigger, references on all tables in schema public from anon, authenticated;
alter default privileges in schema public revoke truncate, trigger, references on tables from anon, authenticated;

-- 2) Chat: nobody can pretend to be someone else or to be Rawia
create or replace function public.messages_set_author() returns trigger
language plpgsql security definer set search_path = public as $$
declare p record;
begin
  select full_name, email, role into p from public.profiles where id = new.user_id;
  new.is_admin := coalesce(p.role = 'admin', false);
  new.author_name := left(coalesce(nullif(trim(p.full_name), ''), split_part(coalesce(p.email, ''), '@', 1), '—'), 80);
  new.created_at := now();
  return new;
end $$;
revoke execute on function public.messages_set_author() from public, anon, authenticated;
drop trigger if exists messages_set_author on public.messages;
create trigger messages_set_author before insert on public.messages
  for each row execute function public.messages_set_author();

-- 3) Orders & subscribers: size limits
alter table public.orders drop constraint if exists orders_size_limits;
alter table public.orders add constraint orders_size_limits check (
  char_length(coalesce(name,'')) <= 200 and char_length(coalesce(phone,'')) <= 50
  and char_length(coalesce(email,'')) <= 200 and char_length(coalesce(note,'')) <= 3000
  and char_length(coalesce(total,'')) <= 100 and char_length(coalesce(lang,'')) <= 10
  and char_length(coalesce(timezone,'')) <= 80 and pg_column_size(items) <= 20000
) not valid;
alter table public.subscribers drop constraint if exists subscribers_size_limits;
alter table public.subscribers add constraint subscribers_size_limits check (
  char_length(coalesce(name,'')) <= 200 and char_length(coalesce(lang,'')) <= 10
  and char_length(coalesce(source,'')) <= 100 and char_length(coalesce(timezone,'')) <= 80
) not valid;

-- 4) New orders from visitors always start as "pending"
create or replace function public.orders_force_pending() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    new.status := 'pending'; new.meeting_url := null; new.session_at := null; new.created_at := now();
  end if;
  return new;
end $$;
revoke execute on function public.orders_force_pending() from public, anon, authenticated;
drop trigger if exists orders_force_pending on public.orders;
create trigger orders_force_pending before insert on public.orders
  for each row execute function public.orders_force_pending();

-- 5) Profiles: a client can edit only his own name / phone / country
create or replace function public.protect_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.id := old.id; new.email := old.email; new.created_at := old.created_at;
    new.full_name := left(coalesce(new.full_name,''), 120);
    new.phone := left(coalesce(new.phone,''), 50);
    new.country := left(coalesce(new.country,''), 80);
  end if;
  return new;
end $$;
revoke execute on function public.protect_profile() from public, anon, authenticated;
drop trigger if exists protect_profile on public.profiles;
create trigger protect_profile before update on public.profiles
  for each row execute function public.protect_profile();
