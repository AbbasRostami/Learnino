import { api } from "@/lib/upfetch";
import type { ApiError, ClearCartResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseClearCartOptions {
  onSuccessCallback?: () => void;
}

export const useClearCart = ({
  onSuccessCallback,
}: UseClearCartOptions = {}) => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<ClearCartResponse, ApiError, void>({
    mutationFn: () =>
      api<ClearCartResponse>("/cart", {
        method: "DELETE",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("clearSuccess"));

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
