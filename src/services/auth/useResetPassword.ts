import { api } from "@/hooks/upfetch";
import { useRouter } from "@/i18n/routing";
import { ApiError, ResetPasswordPayload, ResetPasswordResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useResetPassword = () => {
  const t = useTranslations("auth");
  const router = useRouter();

  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordPayload>({
    mutationFn: (data) =>
      api<ResetPasswordResponse>("/auth/reset-password", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("resetPasswordSuccess"));
      router.push("/login");
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
