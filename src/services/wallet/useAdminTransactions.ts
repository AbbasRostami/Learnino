import { api } from "@/hooks/upfetch";
import {
  GetAdminTransactionsParams,
  GetAdminTransactionsResponse,
} from "@/types/wallet/wallet.types";

import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminTransactionsParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);
  if (params.type) searchParams.append("type", params.type);
  if (params.userId) searchParams.append("userId", params.userId);
  if (params.startDate) searchParams.append("startDate", params.startDate);
  if (params.endDate) searchParams.append("endDate", params.endDate);

  return searchParams.toString();
};


export const useAdminTransactions = (
  params: GetAdminTransactionsParams = {},
) => {
  return useQuery<GetAdminTransactionsResponse>({
    queryKey: ["admin", "transactions", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminTransactionsResponse>(
        `/wallet/admin/transactions${qs ? `?${qs}` : ""}`,
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
