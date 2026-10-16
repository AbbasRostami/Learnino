import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type {
  GetMyEnrolledCoursesParams,
  GetMyEnrolledCoursesResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useMyEnrolledCourses = (
  params: GetMyEnrolledCoursesParams = {},
) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyEnrolledCoursesResponse>({
    queryKey: ["my-enrollments", locale, params],
    queryFn: () =>
      api<GetMyEnrolledCoursesResponse>("/enrollments/my-courses", {
        params,
        headers: {
          "Accept-Language": locale,
        },
      }),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};