import { api } from "@/lib/upfetch";
import type {
  GetTeachersParams,
  GetTeachersResponse,
} from "@/types/teacher/teacher.types";
import { useQuery } from "@tanstack/react-query";

export const useTeachers = (params: GetTeachersParams = {}) => {
  return useQuery<GetTeachersResponse>({
    queryKey: ["teachers", "list", params],
    queryFn: () =>
      api<GetTeachersResponse>("/teachers", {
        params,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
