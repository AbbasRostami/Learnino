import { api } from "@/lib/upfetch";
import type { UserDetailsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (userId: string | undefined) => {
  return useQuery<UserDetailsResponse>({
    queryKey: ["admin", "users", userId],
    queryFn: () => api<UserDetailsResponse>(`/users/${userId}`),
    enabled: Boolean(userId),
    staleTime: 60 * 1000,
  });
};
