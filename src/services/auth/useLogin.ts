import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (data) =>
      api<LoginResponse>("/auth/login", {
        method: "POST",
        body: data,
      }),
  });
};