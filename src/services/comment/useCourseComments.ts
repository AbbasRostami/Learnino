import { api } from "@/hooks/upfetch";
import type {
  GetCourseCommentsParams,
  GetCourseCommentsResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetCourseCommentsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  return searchParams.toString();
};

export const useCourseComments = (
  slug: string | undefined,
  params: GetCourseCommentsParams = {},
) => {
  return useQuery<GetCourseCommentsResponse>({
    queryKey: ["comments", "course", slug, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetCourseCommentsResponse>(
        `/comments/course/${slug!}${qs ? `?${qs}` : ""}`,
      );
    },
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
