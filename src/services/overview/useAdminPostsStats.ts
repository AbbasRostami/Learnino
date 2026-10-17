import { api } from "@/lib/upfetch";
import type { GetAdminPostsStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminPostsStats = () => {
  return useQuery<GetAdminPostsStatsResponse>({
    queryKey: ["admin", "overview", "posts"],
    queryFn: () => api<GetAdminPostsStatsResponse>("/overview/admin/posts"),
    staleTime: 60 * 1000,
  });
};
