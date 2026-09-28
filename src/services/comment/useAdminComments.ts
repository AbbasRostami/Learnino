import { api } from "@/hooks/upfetch";
import type {
  GetAdminCommentsParams,
  GetAdminCommentsResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminCommentsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }
  return searchParams.toString();
};

export const useAdminComments = (params: GetAdminCommentsParams = {}) => {
  return useQuery<GetAdminCommentsResponse>({
    queryKey: ["admin", "comments", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminCommentsResponse>(
        `/comments/admin${qs ? `?${qs}` : ""}`,
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};