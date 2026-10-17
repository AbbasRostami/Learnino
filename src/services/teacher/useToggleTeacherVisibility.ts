import { api } from "@/lib/upfetch";
import type {
  ApiError,
  ToggleTeacherVisibilityPayload,
  ToggleTeacherVisibilityResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseToggleTeacherVisibilityOptions {
  onSuccessCallback?: () => void;
}

export const useToggleTeacherVisibility = ({
  onSuccessCallback,
}: UseToggleTeacherVisibilityOptions = {}) => {
  const t = useTranslations("teacher");
  const queryClient = useQueryClient();

  return useMutation<
    ToggleTeacherVisibilityResponse,
    ApiError,
    ToggleTeacherVisibilityPayload
  >({
    mutationFn: ({ id, show }) =>
      api<ToggleTeacherVisibilityResponse>(`/teachers/${id}/visibility`, {
        method: "PATCH",
        body: { show },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("visibilityToggleSuccess"));

      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "teachers"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
