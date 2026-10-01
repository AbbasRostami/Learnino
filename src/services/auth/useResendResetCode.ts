import { api } from "@/hooks/upfetch";
import {
  ApiError,
  ResendResetCodePayload,
  ResendResetCodeResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useResendResetCode = () => {
  const t = useTranslations("auth");

  return useMutation<ResendResetCodeResponse, ApiError, ResendResetCodePayload>(
    {
      mutationFn: (data) =>
        api<ResendResetCodeResponse>("/auth/resend-reset-code", {
          method: "POST",
          body: data,
        }),

      onSuccess: (response) => {
        toast.success(response.data.message || t("otpResentSuccess"));
      },

      onError: (error) => {
        toast.error(error.message || t("errorGeneral"));
      },
    },
  );
};
