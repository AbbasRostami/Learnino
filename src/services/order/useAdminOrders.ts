import { api } from "@/hooks/upfetch";
import type { GetAdminOrdersParams, GetAdminOrdersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminOrdersParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  return searchParams.toString();
};

export const useAdminOrders = (params: GetAdminOrdersParams = {}) => {
  return useQuery<GetAdminOrdersResponse>({
    queryKey: ["admin", "orders", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminOrdersResponse>(`/orders/admin${qs ? `?${qs}` : ""}`);
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
