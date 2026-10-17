import { api } from "@/lib/upfetch";
import type { ApiError, CheckoutWalletResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCheckoutWalletOptions {
  onSuccessCallback?: (data: CheckoutWalletResponse["data"]) => void;
}

export const useCheckoutWallet = ({
  onSuccessCallback,
}: UseCheckoutWalletOptions = {}) => {
  const t = useTranslations("order");
  const queryClient = useQueryClient();

  return useMutation<CheckoutWalletResponse, ApiError, void>({
    mutationFn: () =>
      api<CheckoutWalletResponse>("/orders/checkout/wallet", {
        method: "POST",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("paymentSuccess"));

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });

      onSuccessCallback?.(response.data);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
