import { api } from "@/lib/upfetch";
import { ApiError } from "@/types";
import {
  ChargeWalletPayload,
  ChargeWalletResponse,
} from "@/types/wallet/wallet.types";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseChargeWalletOptions {
  autoRedirect?: boolean;
  onSuccessCallback?: (data: ChargeWalletResponse["data"]) => void;
}

export const useChargeWallet = ({
  autoRedirect = true,
  onSuccessCallback,
}: UseChargeWalletOptions = {}) => {
  const t = useTranslations("wallet");

  return useMutation<ChargeWalletResponse, ApiError, ChargeWalletPayload>({
    mutationFn: (data) =>
      api<ChargeWalletResponse>("/wallet/charge", {
        method: "POST",
        body: data,
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
