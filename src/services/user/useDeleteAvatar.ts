import { api } from "@/lib/upfetch";
import { ApiError, DeleteAvatarResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useDeleteAvatar = () => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();

  return useMutation<DeleteAvatarResponse, ApiError, void>({
    mutationFn: () =>
      api<DeleteAvatarResponse>("/users/profile/avatar", {
        method: "DELETE",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("avatarDeleted"));
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
