-- Centre Holistique — step 5: security fix (applied 2026-11-22)
-- Trigger functions must never be callable from the website API.
-- The triggers keep working: Postgres does not check EXECUTE when a trigger fires.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.protect_role() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
