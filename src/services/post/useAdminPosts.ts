import { api } from "@/hooks/upfetch";
import type { GetAdminPostsParams, GetAdminPostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminPostsParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.published) searchParams.append("published", params.published);
  if (params.search?.trim()) searchParams.append("search", params.search.trim());

  return searchParams.toString();
};

export const useAdminPosts = (params: GetAdminPostsParams = {}) => {
  return useQuery<GetAdminPostsResponse>({
    queryKey: ["admin", "posts", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminPostsResponse>(`/posts/admin${qs ? `?${qs}` : ""}`);
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};