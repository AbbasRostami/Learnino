import { api } from "@/lib/upfetch";
import type { GetCoursesParams, GetCoursesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useCourses = (params: GetCoursesParams = {}) => {
  const locale = useLocale();

  return useQuery<GetCoursesResponse>({
    queryKey: ["courses", "public", locale, params],
    queryFn: () =>
      api<GetCoursesResponse>("/courses", {
        params,
      }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
