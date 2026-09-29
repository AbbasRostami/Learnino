import { api } from "@/hooks/upfetch";
import type {
  GetTeachersParams,
  GetTeachersResponse,
} from "@/types/teacher/teacher.types";
import { useQuery } from "@tanstack/react-query";

const buildQueryString = (params: GetTeachersParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.limit) searchParams.append("limit", String(params.limit));
  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  return searchParams.toString();
};

export const useTeachers = (params: GetTeachersParams = {}) => {
  return useQuery<GetTeachersResponse>({
    queryKey: ["teachers", "list", params],
    queryFn: () => {
      const qs = buildQueryString(params);
      return api<GetTeachersResponse>(`/teachers${qs ? `?${qs}` : ""}`);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
