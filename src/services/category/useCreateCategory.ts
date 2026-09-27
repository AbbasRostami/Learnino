import { api } from "@/hooks/upfetch";
import {
  ApiError,
  CreateCategoryPayload,
  CreateCategoryResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreateCategoryOptions {
  onSuccessCallback?: (categoryId: string) => void;
}

export const useCreateCategory = ({
  onSuccessCallback,
}: UseCreateCategoryOptions = {}) => {
  const t = useTranslations("category");
  const queryClient = useQueryClient();

  return useMutation<CreateCategoryResponse, ApiError, CreateCategoryPayload>({
    mutationFn: (data) =>
      api<CreateCategoryResponse>("/categories", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("createSuccess"));

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });

      onSuccessCallback?.(response.data.category.id);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
