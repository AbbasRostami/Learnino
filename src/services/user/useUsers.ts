import { api } from "@/lib/upfetch";
import type { ListUsersParams, ListUsersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (params: ListUsersParams = {}) => {
  return useQuery<ListUsersResponse>({
    queryKey: ["admin", "users", params],
    queryFn: () =>
      api<ListUsersResponse>("/users", {
        params,
      }),
    staleTime: 30 * 1000,
  });
};
