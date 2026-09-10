import { useMutation } from "@tanstack/react-query";
import { ResetPasswordPayload, ResetPasswordResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: (data) =>
      api<ResetPasswordResponse>("/auth/reset-password", {
        method: "POST",
        body: data,
      }),
  });
};