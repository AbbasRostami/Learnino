import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetTransactionsParams, GetTransactionsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useTransactions = (params: GetTransactionsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetTransactionsResponse>({
    queryKey: ["wallet", "transactions", locale, params],
    queryFn: () =>
      api<GetTransactionsResponse>("/wallet/transactions", {
        params,
      }),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
