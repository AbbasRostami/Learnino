import { api } from "@/lib/upfetch";
import { ApiError, RemoveDiscountResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useRemoveDiscount = () => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<RemoveDiscountResponse, ApiError, void>({
    mutationFn: () =>
      api<RemoveDiscountResponse>("/cart/discount", {
        method: "DELETE",
      }),
    onSuccess: (response) => {
      toast.success(response.data.message || "کد تخفیف حذف شد");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
