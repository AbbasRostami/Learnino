import { api } from "@/lib/upfetch";
import type {
  ApiError,
  UpdateTeacherPayload,
  UpdateTeacherResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUpdateTeacherOptions {
  onSuccessCallback?: () => void;
}

export const useUpdateTeacher = ({
  onSuccessCallback,
}: UseUpdateTeacherOptions = {}) => {
  const t = useTranslations("teacher");
  const queryClient = useQueryClient();

  return useMutation<UpdateTeacherResponse, ApiError, UpdateTeacherPayload>({
    mutationFn: ({ id, ...data }) =>
      api<UpdateTeacherResponse>(`/teachers/${id}`, {
        method: "PUT",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("updateSuccess"));

      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({
        queryKey: ["teachers", "detail"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
