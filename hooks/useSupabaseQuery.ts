import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export type SupabaseQuery<T> = () => PromiseLike<T>;

export const useSupabaseQuery = <T, U extends PostgrestSingleResponse<T> | PostgrestResponse<T>>(
  query: SupabaseQuery<U>,
  deps: unknown[]
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<U['data'] | undefined>();

  async function fetchData() {
    try {
      setIsLoading(true);

      const { data: supabaseData, error: supabaseError } = await query();

      if (supabaseError) {
        throw supabaseError;
      }

      setData(supabaseData ?? undefined);
    } catch (ex) {
      setError(ex);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, deps);

  return {
    isLoading,
    data,
    error,
  };
};
