import { revalidateCategoriesAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import {
  ApiError,
  ToggleCategoryVisibilityPayload,
  ToggleCategoryVisibilityResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseToggleCategoryVisibilityOptions {
  onSuccessCallback?: () => void;
}

export const useToggleCategoryVisibility = ({
  onSuccessCallback,
}: UseToggleCategoryVisibilityOptions = {}) => {
  const t = useTranslations("category");
  const queryClient = useQueryClient();

  return useMutation<
    ToggleCategoryVisibilityResponse,
    ApiError,
    ToggleCategoryVisibilityPayload
  >({
    mutationFn: ({ id, show }) =>
      api<ToggleCategoryVisibilityResponse>(`/categories/${id}/visibility`, {
        method: "PATCH",
        body: { show },
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("visibilityToggleSuccess"));

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      void revalidateCategoriesAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
