import {
  type QueryKey,
  type InfiniteData,
  type UseInfiniteQueryOptions,
  type useInfiniteQuery,
} from '@tanstack/react-query';

import { type UseMergedInfiniteQueriesError } from './use-merged-infinite-queries-error';

export type MergedQueryStatus = 'idle' | 'loading' | 'success' | 'error';

export type MergedQueriesResults<TData> = {
  data: Array<TData>;
  status: MergedQueryStatus;
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: UseMergedInfiniteQueriesError | null;
  refetch: () => void;
};

export type SingleInfiniteQueryOptions<
  TResponse,
  TPageParam,
  TQueryKey extends QueryKey,
> = UseInfiniteQueryOptions<
  TResponse,
  Error,
  InfiniteData<TResponse, TPageParam>,
  TResponse,
  TQueryKey,
  TPageParam
>;

export type SingleInfiniteQueryResult<TResponse> = ReturnType<
  typeof useInfiniteQuery<TResponse>
>;

export type Props<TData, TResponse, TPageParam, TQueryKey extends QueryKey> = {
  queries: Array<SingleInfiniteQueryOptions<TResponse, TPageParam, TQueryKey>>;
  pageSize: number;
  flattenResponse: (queryResult: TResponse) => Array<TData>;
  compare: (a: TData, b: TData) => number;
};
