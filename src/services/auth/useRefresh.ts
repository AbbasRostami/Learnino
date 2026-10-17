import { api } from "@/lib/upfetch";
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
