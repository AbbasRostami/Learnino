import { api } from "@/lib/upfetch";
import type { GetAdminDiscountsStatsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminDiscountsStats = () => {
  return useQuery<GetAdminDiscountsStatsResponse>({
    queryKey: ["admin", "overview", "discounts"],
    queryFn: () =>
      api<GetAdminDiscountsStatsResponse>("/overview/admin/discounts"),
    staleTime: 60 * 1000,
  });
};
