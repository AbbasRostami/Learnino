import { useRouter } from "@/i18n/routing";
import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import type {
  ApiError,
  VerifyChangeEmailPayload,
  VerifyChangeEmailResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseVerifyChangeEmailOptions {
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: ApiError) => void;
}

export const useVerifyChangeEmail = ({
  onSuccessCallback,
  onErrorCallback,
}: UseVerifyChangeEmailOptions = {}) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const resetAuth = useAuthStore((state) => state.resetAuth);

  return useMutation<
    VerifyChangeEmailResponse,
    ApiError,
    VerifyChangeEmailPayload
  >({
    mutationFn: (data) =>
      api<VerifyChangeEmailResponse>("/auth/verify-change-email", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response?.data?.message);
      onSuccessCallback?.();

      setTimeout(() => {
        resetAuth();
        router.push("/login");
      }, 1500);
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
      onErrorCallback?.(error);
    },
  });
};
