import { useMutation } from "@tanstack/react-query";
import { RefreshResponse } from "@/types/auth/auth.types";
import { api } from "@/hooks/upfetch";

export const useRefresh = () => {
  return useMutation<RefreshResponse, Error>({
    mutationFn: () =>
      api<RefreshResponse>("/auth/refresh", {
        method: "POST",
      }),
  });
};