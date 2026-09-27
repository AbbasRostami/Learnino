import { api } from "@/hooks/upfetch";
import { ApiError, UnbanUserResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUnbanUserOptions {
  onSuccessCallback?: () => void;
}

export const useUnbanUser = ({
  onSuccessCallback,
}: UseUnbanUserOptions = {}) => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();

  return useMutation<UnbanUserResponse, ApiError, string>({
    mutationFn: (userId) =>
      api<UnbanUserResponse>(`/users/${userId}/ban`, {
        method: "DELETE",
      }),

    onSuccess: (response, userId) => {
      toast.success(response.data.message || t("unbanSuccess"));

      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "users", userId],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
