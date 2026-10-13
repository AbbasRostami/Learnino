import { api } from "@/hooks/upfetch";
import type { GetOrderResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useOrder = (orderId: string | undefined) => {
  const locale = useLocale();

  return useQuery<GetOrderResponse>({
    queryKey: ["orders", "detail", locale, orderId],
    queryFn: () => api<GetOrderResponse>(`/orders/${orderId}`),
    enabled: Boolean(orderId),
    staleTime: 60 * 1000,
  });
};
