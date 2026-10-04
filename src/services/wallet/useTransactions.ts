import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import { GetTransactionsParams, GetTransactionsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetTransactionsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);
  if (params.type) searchParams.append("type", params.type);
  return searchParams.toString();
};

export const useTransactions = (params: GetTransactionsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetTransactionsResponse>({
    queryKey: ["wallet", "transactions", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetTransactionsResponse>(
        `/wallet/transactions${qs ? `?${qs}` : ""}`,
        {
          headers: { "Accept-Language": locale },
        },
      );
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
