import { Dispatch, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { SupabaseSubscriptionReducerAction } from './useSupabaseSubscriptionReducer';
import { SupabaseSubscriptionQuery } from './useSupabaseSubscriptionQuery';

export const useSupabaseSubscription = <T>(
  query: SupabaseSubscriptionQuery<T>,
  dispatch: Dispatch<SupabaseSubscriptionReducerAction<T>>,
  deps: unknown[]
) => {
  useEffect(() => {
    const subscription = query().on('*', dispatch).subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, deps);
};
