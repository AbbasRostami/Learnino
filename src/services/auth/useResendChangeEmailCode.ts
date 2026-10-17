import { api } from "@/lib/upfetch";
import type { ApiError, ResendChangeEmailResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useResendChangeEmailCode = () => {
  const t = useTranslations("auth");

  return useMutation<ResendChangeEmailResponse, ApiError>({
    mutationFn: () =>
      api<ResendChangeEmailResponse>("/auth/resend-change-email-code", {
        method: "POST",
      }),

    onSuccess: (response) => {
      toast.success(response?.data?.message || t("otpResentSuccess"));
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};
