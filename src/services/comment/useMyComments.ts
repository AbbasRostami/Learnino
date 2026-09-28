import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import type { GetMyCommentsParams, GetMyCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const buildQueryString = (params: GetMyCommentsParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.status) searchParams.append("status", params.status);
  return searchParams.toString();
};

export const useMyComments = (params: GetMyCommentsParams = {}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<GetMyCommentsResponse>({
    queryKey: ["my-comments", locale, params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetMyCommentsResponse>(
        `/comments/my-comments${qs ? `?${qs}` : ""}`,
        {
          headers: { "Accept-Language": locale },
        },
      );
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
