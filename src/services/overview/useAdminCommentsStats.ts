import { api } from "@/hooks/upfetch";
import type { GetAdminCommentsStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const useAdminCommentsStats = () => {
  return useQuery<GetAdminCommentsStatsResponse>({
    queryKey: ["admin", "overview", "comments"],
    queryFn: () =>
      api<GetAdminCommentsStatsResponse>("/overview/admin/comments"),
    staleTime: 60 * 1000,
  });
};