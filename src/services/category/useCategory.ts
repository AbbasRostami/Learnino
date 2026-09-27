import { api } from "@/hooks/upfetch";
import type { GetCategoryBySlugResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const useCategory = (slug: string | undefined) => {
  return useQuery<GetCategoryBySlugResponse>({
    queryKey: ["categories", "detail", slug],
    queryFn: () =>
      api<GetCategoryBySlugResponse>(
        `/categories/${encodeURIComponent(slug!)}`,
      ),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000,
  });
};
