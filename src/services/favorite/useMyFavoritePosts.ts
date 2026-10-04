import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetFavoritePostsParams, GetFavoritePostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetFavoritePostsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  return searchParams.toString();
};

export const useMyFavoritePosts = (params: GetFavoritePostsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetFavoritePostsResponse>({
    queryKey: ["favorite-posts", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetFavoritePostsResponse>(
        `/favorites/posts${qs ? `?${qs}` : ""}`,
        { headers: { "Accept-Language": locale } },
      );
    },
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
