import { api } from "@/lib/upfetch";
import type { GetPostsParams, GetPostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

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
