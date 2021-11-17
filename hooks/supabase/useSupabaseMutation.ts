import { PostgrestResponse } from '@supabase/supabase-js';
import { useCallback } from 'react';
import { useMutation } from '../async/useMutation';

export type SupabaseMutation<TResult = unknown> = () => Promise<PostgrestResponse<TResult>>;

export const useSupabaseMutation = <TResult = unknown>() => {
  const [state, dispatch] = useMutation<TResult[]>();

  /**
   * Execute a mutation and await it. Useful if you need to perform additional one-time logic after a mutation completes
   */
  const mutateAsync = useCallback(
    async (mutation: SupabaseMutation<TResult>) =>
      dispatch.mutateAsync(async () => {
        const result = await mutation();

        if (result.error) {
          throw result.error;
        } else {
          return result.data;
        }
      }),
    [dispatch]
  );

  /**
   * Execute a mutation without awaiting it. Useful if you only need to update the UI on completion
   */
  const mutate = useCallback(
    async (mutation: SupabaseMutation<TResult>) => {
      mutateAsync(mutation).catch(() => {
        // Do nothing
      });
    },
    [dispatch]
  );

  return [state, { mutate, mutateAsync }] as const;
};
