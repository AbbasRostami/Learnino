import { api } from "@/lib/upfetch";
import type { GetAdminOverviewResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminOverview = () => {
  return useQuery<GetAdminOverviewResponse>({
    queryKey: ["admin", "overview", "full"],
    queryFn: () => api<GetAdminOverviewResponse>("/overview/admin"),
    staleTime: 60 * 1000,
  });
};
