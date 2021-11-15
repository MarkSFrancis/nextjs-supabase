import { createContext, useContext } from 'react';
import { Post } from '@/lib/supabase/constants';

export interface PostContext {
  post: Post;
}

const PostContext = createContext<PostContext>(undefined as unknown as PostContext);

export const usePostContext = () => useContext(PostContext);

export const PostProvider = PostContext.Provider;
