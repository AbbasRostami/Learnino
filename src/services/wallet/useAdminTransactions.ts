import { api } from "@/hooks/upfetch";
import type {
  GetAdminTransactionsParams,
  GetAdminTransactionsResponse,
} from "@/types/wallet/wallet.types";
import { useQuery } from "@tanstack/react-query";

export const useAdminTransactions = (
  params: GetAdminTransactionsParams = {},
) => {
  return useQuery<GetAdminTransactionsResponse>({
    queryKey: ["admin", "transactions", params],
    queryFn: () =>
      api<GetAdminTransactionsResponse>("/wallet/admin/transactions", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};