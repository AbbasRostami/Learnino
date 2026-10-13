import { api } from "@/hooks/upfetch";
import type { GetCourseBySlugResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useAdminCourseDetails = (idOrSlug: string | undefined) => {
  const locale = useLocale();

  return useQuery<GetCourseBySlugResponse>({
    queryKey: ["admin", "courses", "detail", locale, idOrSlug],
    queryFn: () => api<GetCourseBySlugResponse>(`/courses/admin/${idOrSlug!}`),
    enabled: Boolean(idOrSlug),
    staleTime: 10 * 1000,
  });
};
