import { api } from "@/hooks/upfetch";
import type { GetAdminTeachersParams, GetAdminTeachersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAdminTeachers = (params: GetAdminTeachersParams = {}) => {
  return useQuery<GetAdminTeachersResponse>({
    queryKey: ["admin", "teachers", params],
    queryFn: () =>
      api<GetAdminTeachersResponse>("/teachers/admin", {
        params,
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};