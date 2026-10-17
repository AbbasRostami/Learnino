import { api } from "@/lib/upfetch";
import type { GetPostCommentsParams, GetPostCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePostComments = (
  slug: string | undefined,
  params: GetPostCommentsParams = {},
) => {
  return useQuery<GetPostCommentsResponse>({
    queryKey: ["comments", "post", slug, params],
    queryFn: () =>
      api<GetPostCommentsResponse>(`/comments/post/${slug!}`, {
        params,
      }),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
