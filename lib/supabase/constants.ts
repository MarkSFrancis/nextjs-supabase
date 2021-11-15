/* eslint-disable prefer-destructuring */
export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const DEFAULT_AVATARS_BUCKET = 'avatars';
export const PROFILES_TABLE = 'profiles';
export const POSTS_TABLE = 'posts';

export interface Profile {
  id: string;
  avatar_url: string;
  username: string;
  website: string;
  updated_at: string;
}

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  area_description: string;
  author_id: string;
}
