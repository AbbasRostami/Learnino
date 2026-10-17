import { api } from "@/lib/upfetch";
import type { CancelOrderResponse } from "@/types";
import type { ApiError } from "@/types/api/error.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCancelOrderOptions {
  onSuccessCallback?: () => void;
}

export const useCancelOrder = ({
  onSuccessCallback,
}: UseCancelOrderOptions = {}) => {
  const t = useTranslations("order");
  const queryClient = useQueryClient();

  return useMutation<CancelOrderResponse, ApiError, string>({
    mutationFn: (orderId) =>
      api<CancelOrderResponse>(`/orders/${orderId}/cancel`, {
        method: "PATCH",
      }),

    onSuccess: (response, orderId) => {
      toast.success(response.data.message || t("cancelSuccess"));

      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", "detail", orderId],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
