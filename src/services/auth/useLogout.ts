import { useMutation } from "@tanstack/react-query";
import { LogoutResponse } from "@/types/auth/auth.types";
import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";

export const useLogout = () => {
  const resetAuth = useAuthStore((state) => state.resetAuth);

  return useMutation<LogoutResponse, Error>({
    mutationFn: () =>
      api<LogoutResponse>("/auth/logout", {
        method: "POST",
      }),

    onSuccess: () => {
      resetAuth();
    },
    onError: () => {
      resetAuth();
    },
  });
};