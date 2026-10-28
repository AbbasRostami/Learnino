import { api } from "@/lib/upfetch";
import type { AdminCategoriesParams, AdminCategoriesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminCategories = (params: AdminCategoriesParams = {}) => {
  const locale = useLocale();

  return useQuery<AdminCategoriesResponse>({
    queryKey: ["admin", "categories", locale, params],
    queryFn: () =>
      api<AdminCategoriesResponse>("/categories/admin", {
        params,
        headers: {
          "Accept-Language": locale,
        },
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
