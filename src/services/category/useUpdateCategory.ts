import { api } from "@/hooks/upfetch";
import {
  ApiError,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
} from "@/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUpdateCategoryOptions {
  onSuccessCallback?: () => void;
}


export const useUpdateCategory = ({
  onSuccessCallback,
}: UseUpdateCategoryOptions = {}) => {
  const t = useTranslations("category");
  const queryClient = useQueryClient();

  return useMutation<UpdateCategoryResponse, ApiError, UpdateCategoryPayload>({
    mutationFn: ({ id, ...body }) =>
      api<UpdateCategoryResponse>(`/categories/${id}`, {
        method: "PUT",
        body,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("updateSuccess"));

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({
        queryKey: ["categories", "detail", response.data.category.slug],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
