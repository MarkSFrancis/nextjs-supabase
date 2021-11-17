import { useCallback } from 'react';
import { AsyncStatus, useAsyncMutationReducer } from './state';

export type Mutation<TResult = unknown> = () => Promise<TResult>;

export const useMutation = <TResult = unknown>() => {
  const [state, dispatch] = useAsyncMutationReducer<TResult>();

  /**
   * Execute a mutation and await it. Useful if you need to perform additional one-time logic after a mutation completes
   */
  const mutateAsync = useCallback(
    async (mutation: Mutation<TResult>) => {
      try {
        dispatch({ status: AsyncStatus.Loading });

        const result = await mutation();

        dispatch({ status: AsyncStatus.Success, data: result });
      } catch (ex) {
        dispatch({ status: AsyncStatus.Error, error: ex });
        throw ex;
      }
    },
    [dispatch]
  );

  /**
   * Execute a mutation without awaiting it. Useful if you only need to update the UI on completion
   */
  const mutate = useCallback(
    async (mutation: Mutation<TResult>) => {
      mutateAsync(mutation).catch(() => {
        // Do nothing
      });
    },
    [dispatch]
  );

  return [state, { mutate, mutateAsync }] as const;
};
