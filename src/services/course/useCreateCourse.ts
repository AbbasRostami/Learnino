import { api } from "@/lib/upfetch";
import type {
  ApiError,
  CreateCoursePayload,
  CreateCourseResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreateCourseOptions {
  onSuccessCallback?: (courseId: string) => void;
}

export const useCreateCourse = ({
  onSuccessCallback,
}: UseCreateCourseOptions = {}) => {
  const t = useTranslations("course");
  const queryClient = useQueryClient();

  return useMutation<CreateCourseResponse, ApiError, CreateCoursePayload>({
    mutationFn: (data) =>
      api<CreateCourseResponse>("/courses", {
        method: "POST",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("createSuccess"));

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "courses"],
      });

      onSuccessCallback?.(response.data.course.id);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
