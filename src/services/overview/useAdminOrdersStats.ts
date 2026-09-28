import { api } from "@/hooks/upfetch";
import type { GetAdminOrdersStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrdersStats = () => {
  return useQuery<GetAdminOrdersStatsResponse>({
    queryKey: ["admin", "overview", "orders"],
    queryFn: () => api<GetAdminOrdersStatsResponse>("/overview/admin/orders"),
    staleTime: 60 * 1000,
  });
};
