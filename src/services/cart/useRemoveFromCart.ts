import { api } from "@/hooks/upfetch";
import type { ApiError, RemoveFromCartResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseRemoveFromCartOptions {
  onSuccessCallback?: () => void;
}


export const useRemoveFromCart = ({
  onSuccessCallback,
}: UseRemoveFromCartOptions = {}) => {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation<RemoveFromCartResponse, ApiError, string>({
    mutationFn: (courseId) =>
      api<RemoveFromCartResponse>(`/cart/items/${courseId}`, {
        method: "DELETE",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("removeSuccess"));

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