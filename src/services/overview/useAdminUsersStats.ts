import { api } from "@/lib/upfetch";
import type { GetAdminUsersStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminUsersStats = () => {
  const locale = useLocale();

  return useQuery<GetAdminUsersStatsResponse>({
    queryKey: ["admin", "overview", "users", locale],
    queryFn: () => api<GetAdminUsersStatsResponse>("/overview/admin/users"),
    staleTime: 60 * 1000,
  });
};
