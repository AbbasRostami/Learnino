import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetWalletResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useWallet = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetWalletResponse>({
    queryKey: ["wallet", locale],
    queryFn: () => api<GetWalletResponse>("/wallet"),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });
};
