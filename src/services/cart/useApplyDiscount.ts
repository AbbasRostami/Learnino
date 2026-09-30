import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  ApplyDiscountPayload,
  ApplyDiscountResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseApplyDiscountOptions {
  onSuccessCallback?: () => void;
}

export const useApplyDiscount = ({
  onSuccessCallback,
}: UseApplyDiscountOptions = {}) => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<ApplyDiscountResponse, ApiError, ApplyDiscountPayload>({
    mutationFn: (data) =>
      api<ApplyDiscountResponse>("/cart/apply-discount", {
        method: "POST",
        body: {
          code: data.code.toUpperCase().trim(),
        },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("discountApplied"));
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
