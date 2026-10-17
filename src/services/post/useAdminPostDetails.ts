import { api } from "@/lib/upfetch";
import type { GetPostBySlugResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminPostDetails = (idOrSlug: string | undefined) => {
  const locale = useLocale();

  return useQuery<GetPostBySlugResponse>({
    queryKey: ["admin", "posts", "detail", locale, idOrSlug],
    queryFn: () => api<GetPostBySlugResponse>(`/posts/admin/${idOrSlug!}`),
    enabled: Boolean(idOrSlug),
    staleTime: 10 * 1000,
  });
};
