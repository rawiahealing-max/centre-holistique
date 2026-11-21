-- =====================================================================
-- Centre Holistique — group chat for each course (e.g. Masterclass 2027)
-- Room 'course:<course id>' = participants of that course + Rawia only.
-- Run once in Supabase: SQL Editor → New query → paste → Run. Safe to re-run.
-- =====================================================================

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

grant execute on function public.has_course(text) to authenticated;
