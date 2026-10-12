# Digital Heroes

Digital Heroes is a golf membership MVP built with Next.js 16, React 19, and Supabase. Members can sign up, confirm their email, log in, record Stableford scores, and save a charity choice.

## Run locally

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Set these values in `.env.local` before starting the app:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

In Supabase Auth, allow the callback URL for each environment. For local development, add:

```text
http://localhost:3000/**
```

Add the equivalent URL for the deployed site. Keep secret or service-role keys out of `NEXT_PUBLIC_` variables.

## Set up the member data tables

Run the SQL in [`supabase/migrations/202610060001_member_data.sql`](supabase/migrations/202610060001_member_data.sql) in the Supabase SQL Editor. It creates the charity catalogue, member profiles, and golf scores table; creates a profile for each new auth user; and enables row-level security so each member can access only their own profile and scores.

After running the migration, create a new account or confirm an existing account, then open `/dashboard` to save scores and a charity choice.

## Current product status

- Email/password signup, email confirmation, login, password reset, and logout use Supabase Auth.
- The member dashboard stores golf scores and a charity choice in Supabase.
- Prices and draw details are informational examples. Membership payments, charity payouts, and prize draws are not active.
- Before activating payments or draws, configure a payment provider, confirm the charity partners and allocation process, and publish approved terms, privacy information, eligibility, and draw rules for the launch jurisdiction.

## Checks

```bash
npm run lint
npm run build
```
