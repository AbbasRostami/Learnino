import { api } from "@/hooks/upfetch";
import type { GetAdminEnrollmentsStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminEnrollmentsStats = () => {
  return useQuery<GetAdminEnrollmentsStatsResponse>({
    queryKey: ["admin", "overview", "enrollments"],
    queryFn: () =>
      api<GetAdminEnrollmentsStatsResponse>("/overview/admin/enrollments"),
    staleTime: 60 * 1000,
  });
};
