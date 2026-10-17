import { api } from "@/lib/upfetch";
import type { GetDiscountsParams, GetDiscountsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useDiscounts = (params: GetDiscountsParams = {}) => {
  return useQuery<GetDiscountsResponse>({
    queryKey: ["admin", "discounts", params],
    queryFn: () =>
      api<GetDiscountsResponse>("/discounts", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
