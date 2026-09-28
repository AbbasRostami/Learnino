import { api } from "@/hooks/upfetch";
import type { GetAdminCoursesParams, GetAdminCoursesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildAdminQueryString = (params: GetAdminCoursesParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.level) searchParams.append("level", params.level);
  if (params.published) searchParams.append("published", params.published);
  if (params.minPrice !== undefined) {
    searchParams.append("minPrice", String(params.minPrice));
  }
  if (params.maxPrice !== undefined) {
    searchParams.append("maxPrice", String(params.maxPrice));
  }
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.order) searchParams.append("order", params.order);

  if (params.categories && params.categories.length > 0) {
    params.categories.forEach((cat) => {
      searchParams.append("categories", cat);
    });
  }

  return searchParams.toString();
};

export const useAdminCourses = (params: GetAdminCoursesParams = {}) => {
  const locale = useLocale();

  return useQuery<GetAdminCoursesResponse>({
    queryKey: ["admin", "courses", locale, params],
    queryFn: () => {
      const qs = buildAdminQueryString(params);
      return api<GetAdminCoursesResponse>(
        `/courses/admin${qs ? `?${qs}` : ""}`,
        {
          headers: {
            "Accept-Language": locale,
          },
        },
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
