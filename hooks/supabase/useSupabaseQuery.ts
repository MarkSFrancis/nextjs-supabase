import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery } from '../async/useQuery';

export type SupabaseQuery<T> = () => PromiseLike<T>;

export const useSupabaseQuery = <T, U extends PostgrestSingleResponse<T> | PostgrestResponse<T>>(
  query: SupabaseQuery<U>,
  deps: unknown[]
) => {
  const state = useQuery<U['data']>(async () => {
    const { data, error } = await query();

    if (error) {
      throw error;
    }

    return data ?? null;
  }, deps);

  return state;
};
