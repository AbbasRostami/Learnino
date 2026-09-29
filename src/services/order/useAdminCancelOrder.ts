import { api } from "@/hooks/upfetch";
import { AdminCancelOrderResponse, ApiError } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseAdminCancelOrderOptions {
  onSuccessCallback?: () => void;
}

export const useAdminCancelOrder = ({
  onSuccessCallback,
}: UseAdminCancelOrderOptions = {}) => {
  const t = useTranslations("order");
  const queryClient = useQueryClient();

  return useMutation<AdminCancelOrderResponse, ApiError, string>({
    mutationFn: (orderId) =>
      api<AdminCancelOrderResponse>(`/orders/admin/${orderId}/cancel`, {
        method: "PATCH",
      }),

    onSuccess: (response, orderId) => {
      toast.success(response.data.message || t("adminCancelSuccess"));

      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "orders", "detail", orderId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "orders"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
