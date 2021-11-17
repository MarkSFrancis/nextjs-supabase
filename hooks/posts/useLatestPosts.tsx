import { supabase } from '@/lib/supabase/client';
import { Post, POSTS_TABLE } from '@/lib/supabase/constants';
import { useSupabaseQuery } from '../supabase/useSupabaseQuery';

export interface PostSummary {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  area_description: string;
  author: {
    id: string;
    username: string;
  };
}

export const useLatestPosts = () => {
  const posts = useSupabaseQuery(
    () =>
      supabase
        .from<Post>(POSTS_TABLE)
        .select(
          `
          id,
          created_at,
          updated_at,
          title,
          content,
          area_description,
          users:author_id (
            id,
            username
          )
        `
        )
        .order('created_at', { ascending: false }),
    []
  );

  return posts;
};
