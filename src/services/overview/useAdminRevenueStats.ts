import { api } from "@/lib/upfetch";
import type { GetAdminRevenueStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminRevenueStats = () => {
  return useQuery<GetAdminRevenueStatsResponse>({
    queryKey: ["admin", "overview", "revenue"],
    queryFn: () => api<GetAdminRevenueStatsResponse>("/overview/admin/revenue"),
    staleTime: 60 * 1000,
  });
};
