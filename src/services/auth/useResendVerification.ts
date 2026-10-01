// useResendVerification.ts
import { api } from "@/hooks/upfetch";
import {
  ApiError,
  ResendVerificationPayload,
  ResendVerificationResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useResendVerification = () => {
  const t = useTranslations("auth");

  return useMutation<
    ResendVerificationResponse,
    ApiError,
    ResendVerificationPayload
  >({
    mutationFn: (data) =>
      api<ResendVerificationResponse>("/auth/resend-verification", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
