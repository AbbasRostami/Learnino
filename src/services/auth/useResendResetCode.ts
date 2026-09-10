import { useMutation } from "@tanstack/react-query";
import { ResendResetCodePayload, ResendResetCodeResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useResendResetCode = () => {
  return useMutation<ResendResetCodeResponse, Error, ResendResetCodePayload>({
    mutationFn: (data) =>
      api<ResendResetCodeResponse>("/auth/resend-reset-code", {
        method: "POST",
        body: data,
      }),
  });
};