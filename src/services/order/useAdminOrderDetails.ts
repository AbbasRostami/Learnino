import { useQuery } from "@tanstack/react-query";
import { api } from "@/hooks/upfetch";
import type { GetAdminOrderResponse } from "@/types";


export const useAdminOrderDetails = (orderId: string | undefined) => {
  return useQuery<GetAdminOrderResponse>({
    queryKey: ["admin", "orders", "detail", orderId],
    queryFn: () =>
      api<GetAdminOrderResponse>(`/orders/admin/${orderId}`),
    enabled: Boolean(orderId),
    staleTime: 60 * 1000,
  });
};