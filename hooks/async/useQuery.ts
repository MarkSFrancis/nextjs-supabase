import { useEffect } from 'react';
import { AsyncStatus, useAsyncQueryReducer } from './state';

export type Query<T> = () => PromiseLike<T>;

export const useQuery = <T>(query: Query<T>, deps: unknown[]) => {
  const [state, dispatch] = useAsyncQueryReducer<T>();

  async function fetchData() {
    try {
      dispatch({ status: AsyncStatus.Loading });

      const data = await query();

      dispatch({ status: AsyncStatus.Success, data });
    } catch (ex) {
      dispatch({ status: AsyncStatus.Error, error: ex });
    }
  }

  useEffect(() => {
    fetchData();
  }, deps);

  return state;
};
