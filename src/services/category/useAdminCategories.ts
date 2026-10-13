import { api } from "@/hooks/upfetch";
import type { AdminCategoriesParams, AdminCategoriesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminCategories = (params: AdminCategoriesParams = {}) => {
  return useQuery<AdminCategoriesResponse>({
    queryKey: ["admin", "categories", params],
    queryFn: () =>
      api<AdminCategoriesResponse>("/categories/admin", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
