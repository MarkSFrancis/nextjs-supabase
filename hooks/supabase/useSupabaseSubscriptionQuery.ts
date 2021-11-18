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

  const [state, dispatch] = useSupabaseSubscriptionReducer<T>(initialQuery.data);

  useSupabaseSubscription(query, dispatch, deps);

  return {
    ...initialQuery,
    data: state,
  };
};
