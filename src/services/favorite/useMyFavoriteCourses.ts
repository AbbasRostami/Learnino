import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import type {
  GetFavoriteCoursesParams,
  GetFavoriteCoursesResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetFavoriteCoursesParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  return searchParams.toString();
};

export const useMyFavoriteCourses = (params: GetFavoriteCoursesParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetFavoriteCoursesResponse>({
    queryKey: ["favorite-courses", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetFavoriteCoursesResponse>(
        `/favorites/courses${qs ? `?${qs}` : ""}`,
        { headers: { "Accept-Language": locale } },
      );
    },
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
