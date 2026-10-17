import { api } from "@/lib/upfetch";
import type { ApiError, SyncCartPayload, SyncCartResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseSyncCartOptions {
  onSuccessCallback?: () => void;
}

export const useSyncCart = ({ onSuccessCallback }: UseSyncCartOptions = {}) => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<SyncCartResponse, ApiError, SyncCartPayload>({
    mutationFn: (data) =>
      api<SyncCartResponse>("/cart/sync", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("syncSuccess"));

      if (typeof window !== "undefined") {
        localStorage.removeItem("learnino_guest_cart");
        window.dispatchEvent(new Event("cart-updated"));
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
