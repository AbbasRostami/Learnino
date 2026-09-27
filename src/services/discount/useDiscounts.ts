import { api } from "@/hooks/upfetch";
import type {
  GetDiscountsParams,
  GetDiscountsResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetDiscountsParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.active) searchParams.append("active", params.active);
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  return searchParams.toString();
};

export const useDiscounts = (params: GetDiscountsParams = {}) => {
  return useQuery<GetDiscountsResponse>({
    queryKey: ["admin", "discounts", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetDiscountsResponse>(`/discounts${qs ? `?${qs}` : ""}`);
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};