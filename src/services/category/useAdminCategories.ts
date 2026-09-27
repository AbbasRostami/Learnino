import { api } from "@/hooks/upfetch";
import type { AdminCategoriesParams, AdminCategoriesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: AdminCategoriesParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.show) searchParams.append("show", params.show);
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  return searchParams.toString();
};

export const useAdminCategories = (params: AdminCategoriesParams = {}) => {
  return useQuery<AdminCategoriesResponse>({
    queryKey: ["admin", "categories", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<AdminCategoriesResponse>(
        `/categories/admin${qs ? `?${qs}` : ""}`,
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
