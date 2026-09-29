import { api } from "@/hooks/upfetch";
import type { GetPostsParams, GetPostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetPostsParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.category?.trim()) searchParams.append("category", params.category.trim());
  if (params.search?.trim()) searchParams.append("search", params.search.trim());
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.order) searchParams.append("order", params.order);

  return searchParams.toString();
};

export const usePosts = (params: GetPostsParams = {}) => {
  return useQuery<GetPostsResponse>({
    queryKey: ["posts", "public", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetPostsResponse>(`/posts${qs ? `?${qs}` : ""}`);
    },
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};