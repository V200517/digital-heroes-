create table if not exists public.charities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  impact text not null
);

alter table public.charities add column if not exists slug text;
alter table public.charities add column if not exists impact text;

update public.charities
set slug = case lower(trim(name))
  when 'clean water' then 'clean-water'
  when 'youth education' then 'youth-education'
  when 'green future' then 'green-future'
  else slug
end
where slug is null;

create unique index if not exists charities_slug_uidx
  on public.charities (slug);

insert into public.charities (id, slug, name, description, impact)
values
  (gen_random_uuid(), 'clean-water', 'Clean Water', 'Help communities gain access to safe and reliable drinking water.', 'Clean water access'),
  (gen_random_uuid(), 'youth-education', 'Youth Education', 'Support better learning opportunities for children and young people.', 'Learning opportunities'),
  (gen_random_uuid(), 'green-future', 'Green Future', 'Support projects that protect communities and the environment.', 'Environmental protection')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  impact = excluded.impact;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  selected_charity_id text references public.charities (slug) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists display_name text not null default '';
alter table public.profiles add column if not exists selected_charity_id text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_selected_charity_id_fkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_selected_charity_id_fkey
      foreign key (selected_charity_id)
      references public.charities (slug)
      on delete set null;
  end if;
end;
$$;

create table if not exists public.golf_scores (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  played_on date not null default current_date check (played_on <= current_date),
  course text not null check (char_length(trim(course)) between 1 and 100),
  stableford_points integer not null check (stableford_points between 1 and 45),
  created_at timestamptz not null default now()
);

insert into public.profiles (id, display_name)
select id, coalesce(raw_user_meta_data ->> 'name', '')
from auth.users
on conflict (id) do nothing;

update public.profiles as profile
set display_name = coalesce(auth_user.raw_user_meta_data ->> 'name', '')
from auth.users as auth_user
where profile.id = auth_user.id
  and profile.display_name = '';

create index if not exists golf_scores_user_played_on_idx
  on public.golf_scores (user_id, played_on desc, id desc);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

alter table public.charities enable row level security;
alter table public.profiles enable row level security;
alter table public.golf_scores enable row level security;

do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('charities', 'profiles', 'golf_scores')
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      existing_policy.policyname,
      existing_policy.tablename
    );
  end loop;
end;
$$;

revoke all on public.charities, public.profiles, public.golf_scores from anon, authenticated;
grant select on public.charities to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.golf_scores to authenticated;
grant usage, select on sequence public.golf_scores_id_seq to authenticated;

drop policy if exists "Charities are publicly readable" on public.charities;
create policy "Charities are publicly readable"
  on public.charities for select
  to anon, authenticated
  using (true);

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can read their own golf scores" on public.golf_scores;
create policy "Users can read their own golf scores"
  on public.golf_scores for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own golf scores" on public.golf_scores;
create policy "Users can add their own golf scores"
  on public.golf_scores for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own golf scores" on public.golf_scores;
create policy "Users can update their own golf scores"
  on public.golf_scores for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own golf scores" on public.golf_scores;
create policy "Users can delete their own golf scores"
  on public.golf_scores for delete
  to authenticated
  using ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
