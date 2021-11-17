import { Reducer, useEffect, useReducer } from 'react';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';
import { SupabaseRealtimePayload } from '@supabase/supabase-js';

export type SupabaseSubscription<T> = () => SupabaseQueryBuilder<T>;

export type SupabaseSubscriptionReducerAction<T> =
  | SupabaseRealtimePayload<T>
  | { eventType: 'SET_ALL'; data: T[] };

const handleDatabaseEvent = <T>(state: T[], action: SupabaseSubscriptionReducerAction<T>) => {
  switch (action.eventType) {
    case 'INSERT':
      return [...state, action.new];
    case 'DELETE':
      return state.filter((s) => s !== action.old);
    case 'UPDATE': {
      const updatedIndex = state.findIndex((s) => s === action.old);
      return [...state.slice(0, updatedIndex), action.new, ...state.slice(updatedIndex + 1)];
    }
    case 'SET_ALL':
      return [...action.data];
    default:
      throw new Error(`Unknown event type ${(action as { eventType: unknown }).eventType}`);
  }
};

export const useSupabaseSubscriptionReducer = <T>(queryData: T[]) => {
  const [state, dispatch] = useReducer<Reducer<T[], SupabaseSubscriptionReducerAction<T>>>(
    handleDatabaseEvent,
    queryData
  );

  useEffect(() => {
    dispatch({ eventType: 'SET_ALL', data: queryData ?? [] });
  }, [queryData]);

  return [state, dispatch] as const;
};
