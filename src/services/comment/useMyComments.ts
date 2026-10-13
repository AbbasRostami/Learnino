import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { GetMyCommentsParams, GetMyCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useMyComments = (params: GetMyCommentsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyCommentsResponse>({
    queryKey: ["my-comments", locale, params],
    queryFn: () =>
      api<GetMyCommentsResponse>("/comments/my-comments", {
        params,
      }),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
