import { revalidateCoursesAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type { ApiError, DeleteCourseResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeleteCourseOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteCourse = ({
  onSuccessCallback,
}: UseDeleteCourseOptions = {}) => {
  const t = useTranslations("course");
  const queryClient = useQueryClient();

  return useMutation<DeleteCourseResponse, ApiError, string>({
    mutationFn: (courseId) =>
      api<DeleteCourseResponse>(`/courses/${courseId}`, {
        method: "DELETE",
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("deleteSuccess"));

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview"],
      });

      void revalidateCoursesAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
