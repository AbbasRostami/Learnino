import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  CreateDiscountPayload,
  CreateDiscountResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreateDiscountOptions {
  onSuccessCallback?: () => void;
}

export const useCreateDiscount = ({
  onSuccessCallback,
}: UseCreateDiscountOptions = {}) => {
  const t = useTranslations("discount");
  const queryClient = useQueryClient();

  return useMutation<CreateDiscountResponse, ApiError, CreateDiscountPayload>({
    mutationFn: (data) =>
      api<CreateDiscountResponse>("/discounts", {
        method: "POST",
        body: {
          ...data,
          code: data.code.toUpperCase().trim(),
        },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("createSuccess"));

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