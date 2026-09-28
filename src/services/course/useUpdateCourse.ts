import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  UpdateCoursePayload,
  UpdateCourseResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUpdateCourseOptions {
  onSuccessCallback?: () => void;
}

export const useUpdateCourse = ({
  onSuccessCallback,
}: UseUpdateCourseOptions = {}) => {
  const t = useTranslations("course");
  const queryClient = useQueryClient();

  return useMutation<UpdateCourseResponse, ApiError, UpdateCoursePayload>({
    mutationFn: ({ id, ...data }) =>
      api<UpdateCourseResponse>(`/courses/${id}`, {
        method: "PUT",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("updateSuccess"));

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};