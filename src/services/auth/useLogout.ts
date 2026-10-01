import { api } from "@/hooks/upfetch";
import { useAuthStore } from "@/store/authStore";
import type { ApiError, LogoutResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseLogoutOptions {
  onSuccessCallback?: () => void;
}

export const useLogout = (options: UseLogoutOptions = {}) => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();
  const resetAuth = useAuthStore((s) => s.resetAuth);

  return useMutation<LogoutResponse, ApiError, void>({
    mutationFn: () =>
      api<LogoutResponse>("/auth/logout", {
        method: "POST",
      }),

    onSuccess: () => {
      resetAuth();
      queryClient.clear();
      toast.success(t("logoutSuccess"));
      options.onSuccessCallback?.();
    },

    onError: () => {
      resetAuth();
      queryClient.clear();
      options.onSuccessCallback?.();
    },
  });
};
