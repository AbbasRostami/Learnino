import { api } from "@/hooks/upfetch";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/store/authStore";
import type {
  ApiError,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseChangePasswordOptions {
  onSuccessCallback?: () => void;
}

export const useChangePassword = ({
  onSuccessCallback,
}: UseChangePasswordOptions = {}) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const resetAuth = useAuthStore((state) => state.resetAuth);

  return useMutation<ChangePasswordResponse, ApiError, ChangePasswordPayload>({
    mutationFn: (data) =>
      api<ChangePasswordResponse>("/auth/change-password", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response?.data?.message || t("resetPasswordSuccess"));
      onSuccessCallback?.();

      setTimeout(() => {
        resetAuth();
        router.push("/login");
      }, 1500);
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};
