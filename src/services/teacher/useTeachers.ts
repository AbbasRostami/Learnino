import { api } from "@/lib/upfetch";
import type {
  GetTeachersParams,
  GetTeachersResponse,
} from "@/types/teacher/teacher.types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useTeachers = (params: GetTeachersParams = {}) => {
  const locale = useLocale();

  return useQuery<GetTeachersResponse>({
    queryKey: ["teachers", "list", locale, params],
    queryFn: () =>
      api<GetTeachersResponse>("/teachers", {
        params,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
