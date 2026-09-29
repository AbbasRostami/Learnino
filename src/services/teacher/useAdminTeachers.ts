import { api } from "@/hooks/upfetch";
import type { GetAdminTeachersParams, GetAdminTeachersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetAdminTeachersParams): string => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.show) searchParams.append("show", params.show);
  if (params.search?.trim())
    searchParams.append("search", params.search.trim());
  return searchParams.toString();
};

export const useAdminTeachers = (params: GetAdminTeachersParams = {}) => {
  return useQuery<GetAdminTeachersResponse>({
    queryKey: ["admin", "teachers", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetAdminTeachersResponse>(
        `/teachers/admin${qs ? `?${qs}` : ""}`,
      );
    },
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
