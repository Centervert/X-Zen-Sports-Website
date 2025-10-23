-- Create blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text not null,
  image_url text,
  author_name text not null default 'X-Zen Sports',
  read_time integer not null default 5,
  published boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.blog_posts enable row level security;

-- Public can read published posts
create policy "blog_posts_select_published"
  on public.blog_posts for select
  using (published = true);

-- Authenticated users can view all posts (for admin dashboard)
create policy "blog_posts_select_all_authenticated"
  on public.blog_posts for select
  to authenticated
  using (true);

-- Authenticated users can insert posts
create policy "blog_posts_insert_authenticated"
  on public.blog_posts for insert
  to authenticated
  with check (true);

-- Authenticated users can update posts
create policy "blog_posts_update_authenticated"
  on public.blog_posts for update
  to authenticated
  using (true);

-- Authenticated users can delete posts
create policy "blog_posts_delete_authenticated"
  on public.blog_posts for delete
  to authenticated
  using (true);

-- Create index for slug lookups
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);

-- Create index for published posts
create index if not exists blog_posts_published_idx on public.blog_posts(published);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.handle_updated_at();
