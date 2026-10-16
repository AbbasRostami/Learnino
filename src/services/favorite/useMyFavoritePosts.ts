import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetFavoritePostsParams, GetFavoritePostsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useMyFavoritePosts = (params: GetFavoritePostsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetFavoritePostsResponse>({
    queryKey: ["favorite-posts", locale, params],
    queryFn: () =>
      api<GetFavoritePostsResponse>("/favorites/posts", {
        params,
      }),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
