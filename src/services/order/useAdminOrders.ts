import { api } from "@/lib/upfetch";
import type { GetAdminOrdersParams, GetAdminOrdersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrders = (params: GetAdminOrdersParams = {}) => {
  return useQuery<GetAdminOrdersResponse>({
    queryKey: ["admin", "orders", params],
    queryFn: () =>
      api<GetAdminOrdersResponse>("/orders/admin", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
