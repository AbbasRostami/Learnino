import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import type { GetWalletResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useWallet = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetWalletResponse>({
    queryKey: ["wallet", locale],
    queryFn: () =>
      api<GetWalletResponse>("/wallet", {
        headers: { "Accept-Language": locale },
      }),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });
};
