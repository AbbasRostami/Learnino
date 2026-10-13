import { api } from "@/hooks/upfetch";
import type { GetAdminPostsParams, GetAdminPostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminPosts = (params: GetAdminPostsParams = {}) => {
  return useQuery<GetAdminPostsResponse>({
    queryKey: ["admin", "posts", params],
    queryFn: () =>
      api<GetAdminPostsResponse>("/posts/admin", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
