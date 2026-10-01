import { api } from "@/hooks/upfetch";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/store/authStore";
import { ApiError, VerifyEmailPayload, VerifyEmailResponse } from "@/types";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseVerifyEmailOptions {
  redirectTo?: string;
}

export const useVerifyEmail = ({
  redirectTo = "/",
}: UseVerifyEmailOptions = {}) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  return useMutation<VerifyEmailResponse, ApiError, VerifyEmailPayload>({
    mutationFn: (data) =>
      api<VerifyEmailResponse>("/auth/verify-email", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("welcomeMessage"));
      setAuthenticated(true);
      router.push(redirectTo);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
