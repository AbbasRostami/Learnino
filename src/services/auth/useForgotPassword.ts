import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseForgotPasswordOptions {
  onSuccessCallback?: (email: string) => void;
}

export const useForgotPassword = ({
  onSuccessCallback,
}: UseForgotPasswordOptions = {}) => {
  const t = useTranslations("auth");

  return useMutation<ForgotPasswordResponse, ApiError, ForgotPasswordPayload>({
    mutationFn: (data) =>
      api<ForgotPasswordResponse>("/auth/forgot-password", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response, variables) => {
      toast.success(response.data.message);
      onSuccessCallback?.(variables.email);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
