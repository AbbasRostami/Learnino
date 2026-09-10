import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordPayload, ForgotPasswordResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationFn: (data) =>
      api<ForgotPasswordResponse>("/auth/forgot-password", {
        method: "POST",
        body: data,
      }),
  });
};