import { useMutation } from "@tanstack/react-query";
import { RegisterPayload, RegisterResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (data) =>
      api<RegisterResponse>("/auth/register", {
        method: "POST",
        body: data,
      }),
  });
};