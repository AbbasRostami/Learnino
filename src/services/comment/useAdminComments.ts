import { api } from "@/lib/upfetch";
import type { GetAdminCommentsParams, GetAdminCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminComments = (params: GetAdminCommentsParams = {}) => {
  return useQuery<GetAdminCommentsResponse>({
    queryKey: ["admin", "comments", params],
    queryFn: () =>
      api<GetAdminCommentsResponse>("/comments/admin", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
