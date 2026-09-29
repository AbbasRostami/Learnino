import { api } from "@/hooks/upfetch";
import { GetTeacherBySlugResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTeacher = (slug: string | undefined) => {
  return useQuery<GetTeacherBySlugResponse>({
    queryKey: ["teachers", "detail", slug],
    queryFn: () => api<GetTeacherBySlugResponse>(`/teachers/${slug!}`),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
};
