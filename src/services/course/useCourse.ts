import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type {
  Course,
  GetAdminCoursesResponse,
  GetCourseBySlugResponse,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useCourse = (slug: string | undefined, initialCourse?: Course) => {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<GetCourseBySlugResponse>({
    queryKey: ["courses", "detail", locale, slug, isAuthenticated],
    queryFn: () => api<GetCourseBySlugResponse>(`/courses/${slug!}`),
    enabled: Boolean(slug),
    staleTime: isAuthenticated ? 0 : 60 * 1000,

    initialData: () => {
      if (initialCourse && !isAuthenticated) {
        return {
          status: "success",
          data: {
            course:
              initialCourse as unknown as GetCourseBySlugResponse["data"]["course"],
          },
        };
      }

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
