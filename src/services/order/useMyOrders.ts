import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import type { GetMyOrdersParams, GetMyOrdersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetMyOrdersParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);

  return searchParams.toString();
};

export const useMyOrders = (params: GetMyOrdersParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyOrdersResponse>({
    queryKey: ["my-orders", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetMyOrdersResponse>(
        `/orders/my-orders${qs ? `?${qs}` : ""}`,
        {
          headers: {
            "Accept-Language": locale,
          },
        },
      );
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
