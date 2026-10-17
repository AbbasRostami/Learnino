import { api } from "@/lib/upfetch";
import type { GetAdminCoursesStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminCoursesStats = () => {
  return useQuery<GetAdminCoursesStatsResponse>({
    queryKey: ["admin", "overview", "courses"],
    queryFn: () => api<GetAdminCoursesStatsResponse>("/overview/admin/courses"),
    staleTime: 60 * 1000,
  });
};
