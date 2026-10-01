import { api } from "@/hooks/upfetch";
import { RefreshResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useRefresh = () => {
  return useMutation<RefreshResponse, Error>({
    mutationFn: () =>
      api<RefreshResponse>("/auth/refresh", {
        method: "POST",
      }),
  });
};
