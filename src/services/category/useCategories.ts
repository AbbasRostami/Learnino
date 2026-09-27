import { api } from "@/hooks/upfetch";
import type { GetCategoriesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";


export const useCategories = () => {
  const locale = useLocale();

  return useQuery<GetCategoriesResponse>({
    queryKey: ["categories", "public", locale],
    queryFn: () =>
      api<GetCategoriesResponse>("/categories", {
        headers: {
          "Accept-Language": locale,
        },
      }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
