import { revalidateCategoriesAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import { ApiError, DeleteCategoryResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeleteCategoryOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteCategory = ({
  onSuccessCallback,
}: UseDeleteCategoryOptions = {}) => {
  const t = useTranslations("category");
  const queryClient = useQueryClient();

  return useMutation<DeleteCategoryResponse, ApiError, string>({
    mutationFn: (categoryId) =>
      api<DeleteCategoryResponse>(`/categories/${categoryId}`, {
        method: "DELETE",
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("deleteSuccess"));

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });

      void revalidateCategoriesAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
