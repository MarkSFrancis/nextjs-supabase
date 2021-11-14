# ⚛ [NextJS](https://github.com/vercel/next.js) + [Supabase](https://app.supabase.io/)

This app includes:

- User signups using [Supabase Auth](https://supabase.io/auth)
- User avatar images using [Supabase Storage](https://supabase.io/storage)
- Public profiles restricted with [Supabase Policies](https://supabase.io/docs/guides/auth#policies)
- Frontend using [NextJS](https://nextjs.org/)

# 🚀 Getting Started

## Set up env vars

Create a file in the root folder `.env.local` with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Populate this file with your URL and Key. You can get them from the Supabase dashboard

## Run the application

### Install dependencies

1. This project uses [NodeJS](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/), so make sure you've got them installed first.

1. Open a terminal at the root of this repository

1. Run this in your terminal to install the necessary npm packages:

   ```sh
   yarn install
   ```

1. Start the app in dev mode by running this in your terminal:
   ```
   yarn start
   ```
1. Open your browser to `https://localhost:3000/` and you are ready to go 🚀.
