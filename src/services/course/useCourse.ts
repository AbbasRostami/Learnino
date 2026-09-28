import { api } from "@/hooks/upfetch";
import type { GetAdminCoursesResponse, GetCourseBySlugResponse } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useCourse = (slug: string | undefined) => {
  const locale = useLocale();
  const queryClient = useQueryClient();

  return useQuery<GetCourseBySlugResponse>({
    queryKey: ["courses", "detail", locale, slug],
    queryFn: () =>
      api<GetCourseBySlugResponse>(`/courses/${slug!}`, {
        headers: {
          "Accept-Language": locale,
        },
      }),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,

    initialData: () => {
      if (!slug) return undefined;

      const adminQueries = queryClient.getQueriesData<GetAdminCoursesResponse>({
        queryKey: ["admin", "courses"],
      });

      for (const [_, queryData] of adminQueries) {
        const found = queryData?.data?.items?.find(
          (c) => c.slug === slug || c.id === slug,
        );
        if (found) {
          return {
            status: "success",
            data: {
              course:
                found as unknown as GetCourseBySlugResponse["data"]["course"],
            },
          };
        }
      }

      return undefined;
    },
  });
};
