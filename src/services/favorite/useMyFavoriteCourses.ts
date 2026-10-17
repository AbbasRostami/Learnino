import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import type {
  GetFavoriteCoursesParams,
  GetFavoriteCoursesResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useMyFavoriteCourses = (params: GetFavoriteCoursesParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetFavoriteCoursesResponse>({
    queryKey: ["favorite-courses", locale, params],
    queryFn: () => api<GetFavoriteCoursesResponse>("/favorites/courses"),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
