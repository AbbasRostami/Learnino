import { api } from "@/lib/upfetch";
import type {
  GetCourseCommentsParams,
  GetCourseCommentsResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useCourseComments = (
  slug: string | undefined,
  params: GetCourseCommentsParams = {},
) => {
  return useQuery<GetCourseCommentsResponse>({
    queryKey: ["comments", "course", slug, params],
    queryFn: () =>
      api<GetCourseCommentsResponse>(`/comments/course/${slug!}`, {
        params,
      }),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
