import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api/api";
import { ResendChangeEmailResponse } from "@/types/auth/auth.types";

export const useResendChangeEmailCode = () => {
  return useMutation<ResendChangeEmailResponse, Error>({
    mutationFn: () =>
      api.post("/auth/resend-change-email-code"),
  });
};