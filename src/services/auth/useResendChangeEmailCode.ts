import { useMutation } from "@tanstack/react-query";
import { ResendChangeEmailResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useResendChangeEmailCode = () => {
  return useMutation<ResendChangeEmailResponse, Error>({
    mutationFn: () =>
      api<ResendChangeEmailResponse>("/auth/resend-change-email-code", {
        method: "POST",
      }),
  });
};