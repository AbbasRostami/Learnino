import { api } from "@/lib/upfetch";
import type { BannedUsersParams, BannedUsersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useBannedUsers = (params: BannedUsersParams = {}) => {
  const locale = useLocale();

  return useQuery<BannedUsersResponse>({
    queryKey: ["admin", "users", "blacklist", locale, params],
    queryFn: () =>
      api<BannedUsersResponse>("/users/blacklist", {
        params,
      }),
    staleTime: 30 * 1000,
  });
};
