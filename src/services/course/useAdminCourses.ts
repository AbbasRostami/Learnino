import { api } from "@/hooks/upfetch";
import type { GetAdminCoursesParams, GetAdminCoursesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminCourses = (params: GetAdminCoursesParams = {}) => {
  const locale = useLocale();

  return useQuery<GetAdminCoursesResponse>({
    queryKey: ["admin", "courses", locale, params],
    queryFn: () =>
      api<GetAdminCoursesResponse>("/courses/admin", {
        params,
        headers: {
          "Accept-Language": locale,
        },
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
