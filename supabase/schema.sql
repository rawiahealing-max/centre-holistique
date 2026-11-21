-- =====================================================================
-- Centre Holistique — database schema for Supabase
-- Run once in Supabase: SQL Editor → New query → paste → Run
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS)
-- =====================================================================

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  country text,
  role text not null default 'client' check (role in ('client','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, country)
  values (new.id, new.email,
          coalesce(new.raw_user_meta_data->>'full_name',''),
          coalesce(new.raw_user_meta_data->>'phone',''),
          coalesce(new.raw_user_meta_data->>'country',''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- prevent clients from promoting themselves
create or replace function public.protect_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end $$;
drop trigger if exists protect_role on public.profiles;
create trigger protect_role before update on public.profiles
  for each row execute function public.protect_role();

alter table public.profiles enable row level security;
drop policy if exists "profiles read own or admin" on public.profiles;
create policy "profiles read own or admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles update own or admin" on public.profiles;
create policy "profiles update own or admin" on public.profiles for update using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles delete admin" on public.profiles;
create policy "profiles delete admin" on public.profiles for delete using (public.is_admin());

-- ---------- SITE CONTENT (everything shown on the public site) ----------
create table if not exists public.site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "content public read" on public.site_content;
create policy "content public read" on public.site_content for select using (true);
drop policy if exists "content admin write" on public.site_content;
create policy "content admin write" on public.site_content for all using (public.is_admin()) with check (public.is_admin());

-- ---------- ENROLLMENTS (access to courses / membership / purchases) ----------
create table if not exists public.enrollments (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_type text not null,          -- formations | abonnements | lectures | soins | packs
  item_id text not null,
  title text,
  status text not null default 'active' check (status in ('active','expired','cancelled')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists enrollments_user_idx on public.enrollments(user_id);
alter table public.enrollments enable row level security;
drop policy if exists "enroll read own or admin" on public.enrollments;
create policy "enroll read own or admin" on public.enrollments for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "enroll admin write" on public.enrollments;
create policy "enroll admin write" on public.enrollments for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.enrollments
    where user_id = auth.uid() and item_type = 'abonnements' and status = 'active'
      and (expires_at is null or expires_at > now()));
$$;

create or replace function public.has_course(cid text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.enrollments
    where user_id = auth.uid() and item_type = 'formations' and item_id = cid and status = 'active'
      and (expires_at is null or expires_at > now()));
$$;

-- ---------- ORDERS ----------
create table if not exists public.orders (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete set null,
  name text, phone text, email text,
  items jsonb not null default '[]',
  total text, note text, lang text, timezone text,
  status text not null default 'pending' check (status in ('pending','paid','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
drop policy if exists "orders insert anyone" on public.orders;
create policy "orders insert anyone" on public.orders for insert with check (user_id is null or user_id = auth.uid());
drop policy if exists "orders read own or admin" on public.orders;
create policy "orders read own or admin" on public.orders for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "orders admin update" on public.orders;
create policy "orders admin update" on public.orders for update using (public.is_admin());
drop policy if exists "orders admin delete" on public.orders;
create policy "orders admin delete" on public.orders for delete using (public.is_admin());

-- ---------- COURSE LESSONS ----------
create table if not exists public.lessons (
  id bigserial primary key,
  course_id text not null,
  position int not null default 0,
  title jsonb not null default '{}',
  kind text not null default 'video' check (kind in ('video','audio','pdf','image','text','link')),
  url text,               -- YouTube / Vimeo / external link
  storage_path text,      -- file in the private bucket
  body jsonb,             -- text content (3 languages)
  created_at timestamptz not null default now()
);
create index if not exists lessons_course_idx on public.lessons(course_id, position);
alter table public.lessons enable row level security;
drop policy if exists "lessons read enrolled or admin" on public.lessons;
create policy "lessons read enrolled or admin" on public.lessons for select using (public.is_admin() or public.has_course(course_id));
drop policy if exists "lessons admin write" on public.lessons;
create policy "lessons admin write" on public.lessons for all using (public.is_admin()) with check (public.is_admin());

-- ---------- MEDITATIONS ----------
create table if not exists public.meditations (
  id bigserial primary key,
  position int not null default 0,
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  category text,
  duration text,
  kind text not null default 'audio' check (kind in ('audio','video')),
  url text,
  storage_path text,      -- 'public' bucket for free, 'private' bucket (members/...) for members
  cover text,
  theme text default 'violet',
  members_only boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.meditations enable row level security;
drop policy if exists "meditations admin all" on public.meditations;
create policy "meditations admin all" on public.meditations for all using (public.is_admin()) with check (public.is_admin());

-- public listing: everyone sees titles; media only if free, member or admin
create or replace function public.list_meditations()
returns table (id bigint, "position" int, title jsonb, description jsonb, category text, duration text, kind text,
               url text, storage_path text, cover text, theme text, members_only boolean, locked boolean)
language sql stable security definer set search_path = public as $$
  select m.id, m.position, m.title, m.description, m.category, m.duration, m.kind,
         case when not m.members_only or public.is_member() or public.is_admin() then m.url end,
         case when not m.members_only or public.is_member() or public.is_admin() then m.storage_path end,
         m.cover, m.theme, m.members_only,
         (m.members_only and not (public.is_member() or public.is_admin()))
  from public.meditations m where m.active order by m.position, m.id;
$$;
grant execute on function public.list_meditations() to anon, authenticated;

-- ---------- CHAT ----------
-- room 'cercle' = members group chat ; room 'dm:<user uuid>' = private chat client <-> Rawia ; room 'course:<id>' = group of a course
create table if not exists public.messages (
  id bigserial primary key,
  room text not null default 'cercle',
  user_id uuid not null references public.profiles(id) on delete cascade,
  author_name text,
  is_admin boolean not null default false,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists messages_room_idx on public.messages(room, created_at);
alter table public.messages enable row level security;
drop policy if exists "messages read" on public.messages;
create policy "messages read" on public.messages for select using (
  public.is_admin()
  or (room = 'cercle' and public.is_member())
  or room = 'dm:' || auth.uid()::text
  or (room like 'course:%' and public.has_course(substr(room, 8)))
);
drop policy if exists "messages write" on public.messages;
create policy "messages write" on public.messages for insert with check (
  user_id = auth.uid() and (
    public.is_admin()
    or (room = 'cercle' and public.is_member())
    or room = 'dm:' || auth.uid()::text
    or (room like 'course:%' and public.has_course(substr(room, 8)))
  ) and (is_admin = false or public.is_admin())
);
drop policy if exists "messages admin delete" on public.messages;
create policy "messages admin delete" on public.messages for delete using (public.is_admin());

do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null; end $$;

-- ---------- STORAGE (files) ----------
insert into storage.buckets (id, name, public) values ('public', 'public', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('private', 'private', false) on conflict (id) do nothing;

drop policy if exists "public bucket read" on storage.objects;
create policy "public bucket read" on storage.objects for select using (bucket_id = 'public');
drop policy if exists "admin write files" on storage.objects;
create policy "admin write files" on storage.objects for all
  using (bucket_id in ('public','private') and public.is_admin())
  with check (bucket_id in ('public','private') and public.is_admin());
drop policy if exists "private read entitled" on storage.objects;
create policy "private read entitled" on storage.objects for select using (
  bucket_id = 'private' and (
    public.is_admin()
    or (split_part(name, '/', 1) = 'members' and public.is_member())
    or (split_part(name, '/', 1) = 'courses' and public.has_course(split_part(name, '/', 2)))
  )
);

-- Centre Holistique — step 2: give the website permission to use the tables
-- (row level security rules still decide WHO sees WHAT)
grant usage on schema public to anon, authenticated;

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

grant select, update, delete on public.profiles to authenticated;

grant select, insert, update, delete on public.enrollments to authenticated;
grant usage, select on sequence public.enrollments_id_seq to authenticated;

grant insert on public.orders to anon, authenticated;
grant select, update, delete on public.orders to authenticated;
grant usage, select on sequence public.orders_id_seq to anon, authenticated;

grant select, insert, update, delete on public.lessons to authenticated;
grant usage, select on sequence public.lessons_id_seq to authenticated;

grant select, insert, update, delete on public.meditations to authenticated;
grant usage, select on sequence public.meditations_id_seq to authenticated;

grant select, insert, delete on public.messages to authenticated;
grant usage, select on sequence public.messages_id_seq to authenticated;

grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.is_member() to anon, authenticated;
grant execute on function public.has_course(text) to anon, authenticated;
grant execute on function public.list_meditations() to anon, authenticated;

