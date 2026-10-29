import { api } from "@/lib/upfetch";
import { GetTeacherBySlugResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useTeacher = (slug: string | undefined) => {
  const locale = useLocale();

  return useQuery<GetTeacherBySlugResponse>({
    queryKey: ["teachers", "detail", locale, slug],
    queryFn: () => api<GetTeacherBySlugResponse>(`/teachers/${slug!}`),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
};
