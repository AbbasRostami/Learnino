import { api } from "@/lib/upfetch";
import type { GetPostsParams, GetPostsResponse } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const usePosts = (params: GetPostsParams = {}) => {
  return useQuery<GetPostsResponse>({
    queryKey: ["posts", "public", params],
    queryFn: () =>
      api<GetPostsResponse>("/posts", {
        params,
      }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useInfinitePosts = (params: GetPostsParams = {}) => {
  const { page: _page, ...restParams } = params;

  return useInfiniteQuery<GetPostsResponse>({
    queryKey: ["posts", "public", "infinite", restParams],
    queryFn: ({ pageParam = 1 }) =>
      api<GetPostsResponse>("/posts", {
        params: {
          ...restParams,
          page: pageParam as number,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      if (!pagination) return undefined;
      const totalPages = Math.ceil(pagination.total / pagination.limit);
      return pagination.page < totalPages ? pagination.page + 1 : undefined;
    },
    staleTime: 60 * 1000,
  });
};
