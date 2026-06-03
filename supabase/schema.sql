create extension if not exists pgcrypto;

create table if not exists public.texts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  content text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  view_count integer not null default 0,
  constraint texts_code_uppercase check (code = upper(code)),
  constraint texts_content_not_empty check (length(trim(content)) > 0),
  constraint texts_content_max_length check (length(content) <= 10000)
);

create index if not exists texts_expires_at_idx on public.texts (expires_at);

grant usage on schema public to anon, authenticated, service_role;
grant all on table public.texts to service_role;

create or replace function public.increment_text_view_count(text_code text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.texts
  set view_count = view_count + 1
  where code = upper(text_code)
    and expires_at > now();
$$;

alter table public.texts enable row level security;

grant execute on function public.increment_text_view_count(text) to service_role;

drop policy if exists "No public access to texts" on public.texts;

create policy "No public access to texts"
on public.texts
for all
to anon, authenticated
using (false)
with check (false);
