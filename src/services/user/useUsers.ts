import { api } from "@/hooks/upfetch";
import type { ListUsersParams, ListUsersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: ListUsersParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.search) searchParams.append("search", params.search);
  if (params.role) searchParams.append("role", params.role);
  if (params.isVerified) searchParams.append("isVerified", params.isVerified);
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.order) searchParams.append("order", params.order);

  return searchParams.toString();
};

export const useUsers = (params: ListUsersParams = {}) => {
  return useQuery<ListUsersResponse>({
    queryKey: ["admin", "users", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<ListUsersResponse>(`/users${qs ? `?${qs}` : ""}`);
    },
    staleTime: 30 * 1000,
  });
};
