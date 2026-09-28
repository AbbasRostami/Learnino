import { api } from "@/hooks/upfetch";
import type { GetPostCommentsParams, GetPostCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetPostCommentsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  return searchParams.toString();
};

export const usePostComments = (
  slug: string | undefined,
  params: GetPostCommentsParams = {},
) => {
  return useQuery<GetPostCommentsResponse>({
    queryKey: ["comments", "post", slug, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetPostCommentsResponse>(
        `/comments/post/${slug!}${qs ? `?${qs}` : ""}`,
      );
    },
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
