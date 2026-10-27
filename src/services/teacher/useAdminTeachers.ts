import { api } from "@/lib/upfetch";
import type { GetAdminTeachersParams, GetAdminTeachersResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminTeachers = (params: GetAdminTeachersParams = {}) => {
  const locale = useLocale();

  return useQuery<GetAdminTeachersResponse>({
    queryKey: ["admin", "teachers", locale, params],
    queryFn: () =>
      api<GetAdminTeachersResponse>("/teachers/admin", {
        params,
        headers: {
          "Accept-Language": locale,
        },
      }),
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};
