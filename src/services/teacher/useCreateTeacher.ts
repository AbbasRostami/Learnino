import { revalidateTeachersAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type {
  ApiError,
  CreateTeacherPayload,
  CreateTeacherResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreateTeacherOptions {
  onSuccessCallback?: () => void;
}

export const useCreateTeacher = ({
  onSuccessCallback,
}: UseCreateTeacherOptions = {}) => {
  const t = useTranslations("teacher");
  const queryClient = useQueryClient();

  return useMutation<CreateTeacherResponse, ApiError, CreateTeacherPayload>({
    mutationFn: (data) =>
      api<CreateTeacherResponse>("/teachers", {
        method: "POST",
        body: objectToFormData(data),
      }),

    onSuccess: async (response) => {
      toast.success(response?.data?.message || t("createSuccess"));

      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "teachers"] });

      void revalidateTeachersAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};
