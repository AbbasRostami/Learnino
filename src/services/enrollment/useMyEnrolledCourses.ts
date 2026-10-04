import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type {
  GetMyEnrolledCoursesParams,
  GetMyEnrolledCoursesResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetMyEnrolledCoursesParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));

  return searchParams.toString();
};

export const useMyEnrolledCourses = (
  params: GetMyEnrolledCoursesParams = {},
) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyEnrolledCoursesResponse>({
    queryKey: ["my-enrollments", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetMyEnrolledCoursesResponse>(
        `/enrollments/my-courses${qs ? `?${qs}` : ""}`,
        {
          headers: {
            "Accept-Language": locale,
          },
        },
      );
    },
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
