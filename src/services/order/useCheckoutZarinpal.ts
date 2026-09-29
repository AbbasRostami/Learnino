import { api } from "@/hooks/upfetch";
import type { ApiError } from "@/types/api/error.types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCheckoutZarinpalOptions {
  autoRedirect?: boolean;
  onSuccessCallback?: (data: { orderId: string; paymentUrl: string }) => void;
}

export const useCheckoutZarinpal = ({
  autoRedirect = true,
  onSuccessCallback,
}: UseCheckoutZarinpalOptions = {}) => {
  const t = useTranslations("order");

  return useMutation<any, ApiError, void>({
    mutationFn: () =>
      api<any>("/orders/checkout/zarinpal", {
        method: "POST",
      }),

    onSuccess: (response) => {
      toast.success(t("redirectingToGateway"));

      onSuccessCallback?.(response.data);

      if (autoRedirect && typeof window !== "undefined") {
        window.location.href = response.data.paymentUrl;
      }
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
