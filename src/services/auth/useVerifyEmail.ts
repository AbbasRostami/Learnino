import { useMutation } from "@tanstack/react-query";
import { VerifyEmailPayload, VerifyEmailResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useVerifyEmail = () => {
  return useMutation<VerifyEmailResponse, Error, VerifyEmailPayload>({
    mutationFn: (data) =>
      api<VerifyEmailResponse>("/auth/verify-email", {
        method: "POST",
        body: data,
      }),
  });
};