import { api } from "@/lib/upfetch";
import type { ApiError, ToggleDiscountResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseToggleDiscountOptions {
  onSuccessCallback?: () => void;
}

export const useToggleDiscount = ({
  onSuccessCallback,
}: UseToggleDiscountOptions = {}) => {
  const t = useTranslations("discount");
  const queryClient = useQueryClient();

  return useMutation<ToggleDiscountResponse, ApiError, string>({
    mutationFn: (discountId) =>
      api<ToggleDiscountResponse>(`/discounts/${discountId}/toggle`, {
        method: "PATCH",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("toggleSuccess"));

      queryClient.invalidateQueries({ queryKey: ["admin", "discounts"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "discounts"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
