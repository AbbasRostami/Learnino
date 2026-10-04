import { api } from "@/hooks/upfetch";
import type { EnrollFreeCourseResponse } from "@/types";
import type { ApiError } from "@/types/api/error.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseEnrollFreeCourseOptions {
  onSuccessCallback?: (courseSlug: string) => void;
}

export const useEnrollFreeCourse = ({
  onSuccessCallback,
}: UseEnrollFreeCourseOptions = {}) => {
  const t = useTranslations("enrollment");
  const queryClient = useQueryClient();

  return useMutation<EnrollFreeCourseResponse, ApiError, string>({
    mutationFn: (courseSlug) =>
      api<EnrollFreeCourseResponse>(
        `/enrollments/${encodeURIComponent(courseSlug)}`,
        {
          method: "POST",
        },
      ),

    onSuccess: (response, courseSlug) => {
      toast.success(response.data.message || t("enrollSuccess"));

      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      queryClient.invalidateQueries({
        queryKey: ["courses", "detail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      onSuccessCallback?.(courseSlug);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
