import { useEffect } from 'react';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';
import { supabase } from '@/lib/supabase/client';
import { useSupabaseQuery } from './useSupabaseQuery';
import { useSupabaseSubscriptionReducer } from './useSupabaseSubscriptionReducer';
import { useSupabaseSubscription } from './useSupabaseSubscription';

export type SupabaseSubscriptionQuery<T> = () => SupabaseQueryBuilder<T>;

export const useSupabaseSubscriptionQuery = <T>(
  query: SupabaseSubscriptionQuery<T>,
  deps: unknown[]
) => {
  const initialQuery = useSupabaseQuery(() => query().select('*'), deps);

  const [state, dispatch] = useSupabaseSubscriptionReducer([]);

  useSupabaseSubscription(query, dispatch, deps);

  useEffect(() => {
    const subscription = query().on('*', dispatch).subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, deps);

  return {
    isLoading: initialQuery.isLoading,
    data: state,
    error: initialQuery.error,
  };
};
