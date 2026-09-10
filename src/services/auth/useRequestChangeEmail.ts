import { useMutation } from "@tanstack/react-query";
import { RequestChangeEmailPayload, RequestChangeEmailResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useRequestChangeEmail = () => {
  return useMutation<RequestChangeEmailResponse, Error, RequestChangeEmailPayload>({
    mutationFn: (data) =>
      api<RequestChangeEmailResponse>("/auth/request-change-email", {
        method: "POST",
        body: data,
      }),
  });
};