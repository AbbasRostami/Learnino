import { api } from "@/lib/upfetch";
import type { ApiError, DeleteDiscountResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeleteDiscountOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteDiscount = ({
  onSuccessCallback,
}: UseDeleteDiscountOptions = {}) => {
  const t = useTranslations("discount");
  const queryClient = useQueryClient();

  return useMutation<DeleteDiscountResponse, ApiError, string>({
    mutationFn: (discountId) =>
      api<DeleteDiscountResponse>(`/discounts/${discountId}`, {
        method: "DELETE",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("deleteSuccess"));

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
