-- FAMA: Supabase schema for onboarding and financial snapshot
-- Run this in the Supabase SQL editor

-- Profiles: extends auth.users with onboarding state
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  onboarding_step int default 0,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Financial snapshots: one per user (upserted during onboarding)
create table if not exists public.financial_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  monthly_income_range text,           -- e.g. "3000000-5000000"
  monthly_income_estimate int,         -- midpoint for calculations
  liquid_assets int default 0,
  fixed_expenses int default 0,
  has_debts boolean default false,
  financial_concern text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

alter table public.financial_snapshots enable row level security;

create policy "Users can read own snapshot"
  on public.financial_snapshots for select
  using (auth.uid() = user_id);

create policy "Users can insert own snapshot"
  on public.financial_snapshots for insert
  with check (auth.uid() = user_id);

create policy "Users can update own snapshot"
  on public.financial_snapshots for update
  using (auth.uid() = user_id);

-- Debts: zero or more per user
create table if not exists public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  balance int not null default 0,
  monthly_payment int not null default 0,
  interest_rate numeric(5,2) default 0,
  debt_type text default 'otro',       -- tarjeta, hipoteca, vehiculo, libre_inversion, otro
  created_at timestamptz default now()
);

alter table public.debts enable row level security;

create policy "Users can read own debts"
  on public.debts for select
  using (auth.uid() = user_id);

create policy "Users can insert own debts"
  on public.debts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own debts"
  on public.debts for update
  using (auth.uid() = user_id);

create policy "Users can delete own debts"
  on public.debts for delete
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
