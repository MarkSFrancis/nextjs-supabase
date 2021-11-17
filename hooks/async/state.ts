import { useReducer } from 'react';
import { CombineTypes } from '@/lib/typeUtils/merge';

export enum AsyncStatus {
  Pending = 'pending',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

interface AsyncStateBase {
  isPending: false;
  isLoading: false;
  isError: false;
  isSuccess: false;
  status: AsyncStatus;
  error: undefined;
  data: undefined;
}

export type AsyncStatePending = CombineTypes<
  AsyncStateBase,
  {
    isPending: true;
    status: AsyncStatus.Pending;
  }
>;

export type AsyncStateLoading = CombineTypes<
  AsyncStateBase,
  {
    isLoading: true;
    status: AsyncStatus.Loading;
  }
>;

export type AsyncStateError = CombineTypes<
  AsyncStateBase,
  {
    isError: true;
    status: AsyncStatus.Error;
    error: unknown;
  }
>;

export type AsyncStateSuccess<T> = CombineTypes<
  AsyncStateBase,
  {
    isSuccess: true;
    status: AsyncStatus.Success;
    data: T;
  }
>;

export type AsyncQueryState<T = unknown> =
  | AsyncStateLoading
  | AsyncStateError
  | AsyncStateSuccess<T>;

export type AsyncMutationState<T = unknown> =
  | AsyncStatePending
  | AsyncStateLoading
  | AsyncStateError
  | AsyncStateSuccess<T>;

export type AsyncQueryStateUpdate<T> =
  | Pick<AsyncStatePending, 'status'>
  | Pick<AsyncStateLoading, 'status'>
  | Pick<AsyncStateSuccess<T>, 'data' | 'status'>
  | Pick<AsyncStateError, 'error' | 'status'>;

export type AsyncMutationStateUpdate<T> =
  | AsyncQueryStateUpdate<T>
  | Pick<AsyncStatePending, 'status'>;

const toAsyncState = <T>(action: AsyncMutationStateUpdate<T>): AsyncMutationState<T> => {
  switch (action.status) {
    case AsyncStatus.Pending:
      return {
        isLoading: false,
        isError: false,
        isPending: true,
        isSuccess: false,
        data: undefined,
        error: undefined,
        status: AsyncStatus.Pending,
      };
    case AsyncStatus.Loading:
      return {
        isLoading: true,
        isError: false,
        isPending: false,
        isSuccess: false,
        data: undefined,
        error: undefined,
        status: AsyncStatus.Loading,
      };
    case AsyncStatus.Error:
      return {
        isError: true,
        isLoading: false,
        isPending: false,
        isSuccess: false,
        data: undefined,
        error: action.error,
        status: AsyncStatus.Error,
      };
    case AsyncStatus.Success:
      return {
        isLoading: false,
        isError: false,
        isPending: false,
        isSuccess: true,
        data: action.data as T,
        error: undefined,
        status: AsyncStatus.Success,
      };
    default:
      throw new Error(`Unknown async status value`);
  }
};

export const useAsyncQueryReducer = <T>() => {
  const reducer = useReducer(
    (_state: AsyncQueryState<T>, next: AsyncQueryStateUpdate<T>) =>
      toAsyncState<T>(next) as AsyncQueryState<T>,
    toAsyncState<T>({
      status: AsyncStatus.Loading,
    }) as AsyncQueryState<T>
  );

  return reducer;
};

export const useAsyncMutationReducer = <T>() => {
  const reducer = useReducer(
    (_state: AsyncMutationState<T>, next: AsyncMutationStateUpdate<T>) => toAsyncState<T>(next),
    toAsyncState<T>({
      status: AsyncStatus.Pending,
    })
  );

  return reducer;
};
