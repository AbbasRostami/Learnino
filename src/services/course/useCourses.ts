import { api } from "@/lib/upfetch";
import type { GetCoursesParams, GetCoursesResponse } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useInfiniteCourses = (params: GetCoursesParams = {}) => {
  const locale = useLocale();

  const { page: _page, ...restParams } = params;

  return useInfiniteQuery<GetCoursesResponse>({
    queryKey: ["courses", "public", "infinite", locale, restParams],
    queryFn: ({ pageParam = 1 }) =>
      api<GetCoursesResponse>("/courses", {
        params: {
          ...restParams,
          page: pageParam as number,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      if (!pagination) return undefined;
      const totalPages = Math.ceil(pagination.total / pagination.limit);
      return pagination.page < totalPages ? pagination.page + 1 : undefined;
    },
    staleTime: 60 * 1000,
  });
};
