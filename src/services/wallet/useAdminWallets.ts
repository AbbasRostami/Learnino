import { api } from "@/hooks/upfetch";
import {
  GetAdminWalletsParams,
  GetAdminWalletsResponse,
} from "@/types/wallet/wallet.types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminWalletsParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.minBalance !== undefined) {
    searchParams.append("minBalance", String(params.minBalance));
  }
  if (params.maxBalance !== undefined) {
    searchParams.append("maxBalance", String(params.maxBalance));
  }
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  return searchParams.toString();
};

export const useAdminWallets = (params: GetAdminWalletsParams = {}) => {
  return useQuery<GetAdminWalletsResponse>({
    queryKey: ["admin", "wallets", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminWalletsResponse>(
        `/wallet/admin/wallets${qs ? `?${qs}` : ""}`,
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
