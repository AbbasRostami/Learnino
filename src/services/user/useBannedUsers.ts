import { api } from "@/hooks/upfetch";
import type { BannedUsersParams, BannedUsersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useBannedUsers = (params: BannedUsersParams = {}) => {
  const locale = useLocale();

  return useQuery<BannedUsersResponse>({
    queryKey: ["admin", "users", "blacklist", locale, params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.append("page", String(params.page));
      if (params.limit) searchParams.append("limit", String(params.limit));

      const qs = searchParams.toString();
      return api<BannedUsersResponse>(`/users/blacklist${qs ? `?${qs}` : ""}`, {
        headers: { "Accept-Language": locale },
      });
    },
    staleTime: 30 * 1000,
  });
};
