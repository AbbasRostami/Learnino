import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import {
  VerifyChangeEmailPayload,
  VerifyChangeEmailResponse,
} from "@/types/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useVerifyChangeEmail = () => {
  const resetAuth = useAuthStore((state) => state.resetAuth);

  return useMutation<
    VerifyChangeEmailResponse,
    Error,
    VerifyChangeEmailPayload
  >({
    mutationFn: (data) =>
      api<VerifyChangeEmailResponse>("/auth/verify-change-email", {
        method: "POST",
        body: data,
      }),

    onSuccess: () => {
      resetAuth();
    },
  });
};
