import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetMyOrdersParams, GetMyOrdersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useMyOrders = (params: GetMyOrdersParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyOrdersResponse>({
    queryKey: ["my-orders", locale, params],
    queryFn: () =>
      api<GetMyOrdersResponse>("/orders/my-orders", {
        params,
        headers: {
          "Accept-Language": locale,
        },
      }),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
