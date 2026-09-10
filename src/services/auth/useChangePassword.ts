import { useMutation } from "@tanstack/react-query";
import { ChangePasswordPayload, ChangePasswordResponse } from "@/types/auth/auth.types";
import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";

export const useChangePassword = () => {
  const resetAuth = useAuthStore((state) => state.resetAuth);

  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: (data) =>
      api<ChangePasswordResponse>("/auth/change-password", {
        method: "POST",
        body: data,
      }),

    onSuccess: () => {
      resetAuth();
    },
  });
};