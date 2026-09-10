import { useMutation } from "@tanstack/react-query";
import { ResendVerificationPayload, ResendVerificationResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useResendVerification = () => {
  return useMutation<ResendVerificationResponse, Error, ResendVerificationPayload>({
    mutationFn: (data) =>
      api<ResendVerificationResponse>("/auth/resend-verification", {
        method: "POST",
        body: data,
      }),
  });
};