import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, ApiError, UpdateProfilePayload>({
    mutationFn: (data) =>
      api<UpdateProfileResponse>("/users/profile", {
        method: "PUT",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("updateSuccess"));

      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
