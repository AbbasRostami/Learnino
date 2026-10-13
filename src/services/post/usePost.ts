import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetPostBySlugResponse, Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const usePost = (slug: string | undefined, initialPost?: Post) => {
  const locale = useLocale();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<GetPostBySlugResponse>({
    queryKey: ["posts", "detail", locale, slug, isAuthenticated],
    queryFn: () => api<GetPostBySlugResponse>(`/posts/${slug!}`),
    enabled: Boolean(slug),
    staleTime: isAuthenticated ? 0 : 60 * 1000,

    initialData: () => {
      if (initialPost && !isAuthenticated) {
        return {
          status: "success",
          data: {
            post: initialPost as unknown as GetPostBySlugResponse["data"]["post"],
          },
        };
      }
      return undefined;
    },
  });
};
