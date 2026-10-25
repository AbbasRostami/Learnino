import { api } from "@/lib/upfetch";
import { ApiError, BanUserResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseBanUserOptions {
  onSuccessCallback?: () => void;
}

export const useBanUser = ({ onSuccessCallback }: UseBanUserOptions = {}) => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();

  return useMutation<BanUserResponse, ApiError, string>({
    mutationFn: (userId) =>
      api<BanUserResponse>(`/users/${userId}/ban`, {
        method: "POST",
      }),

    onSuccess: (response, userId) => {
      toast.success(response.data.message || t("banSuccess"));

      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blacklist"] });
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
