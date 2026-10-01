import { api } from "@/hooks/upfetch";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/store/authStore";
import { ApiError, LoginPayload, LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseLoginOptions {
  redirectTo?: string;
}

export const useLogin = ({ redirectTo = "/" }: UseLoginOptions = {}) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: (data) =>
      api<LoginResponse>("/auth/login", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("loginSuccess"));
      setAuthenticated(true);
      router.push(redirectTo);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
