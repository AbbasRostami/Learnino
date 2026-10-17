import { api } from "@/lib/upfetch";
import type {
  GetAdminWalletsParams,
  GetAdminWalletsResponse,
} from "@/types/wallet/wallet.types";
import { useQuery } from "@tanstack/react-query";

export const useAdminWallets = (params: GetAdminWalletsParams = {}) => {
  return useQuery<GetAdminWalletsResponse>({
    queryKey: ["admin", "wallets", params],
    queryFn: () =>
      api<GetAdminWalletsResponse>("/wallet/admin/wallets", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
