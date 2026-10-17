import { api } from "@/lib/upfetch";
import type { GetAdminOrderResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrderDetails = (orderId: string | undefined) => {
  return useQuery<GetAdminOrderResponse>({
    queryKey: ["admin", "orders", "detail", orderId],
    queryFn: () => api<GetAdminOrderResponse>(`/orders/admin/${orderId}`),
    enabled: Boolean(orderId),
    staleTime: 60 * 1000,
  });
};
