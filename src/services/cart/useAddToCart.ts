import { api } from "@/hooks/upfetch";
import type { AddToCartPayload, AddToCartResponse, ApiError } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseAddToCartOptions {
  onSuccessCallback?: () => void;
}

export const useAddToCart = ({
  onSuccessCallback,
}: UseAddToCartOptions = {}) => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<AddToCartResponse, ApiError, AddToCartPayload>({
    mutationFn: (data) =>
      api<AddToCartResponse>("/cart/items", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("addSuccess"));

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