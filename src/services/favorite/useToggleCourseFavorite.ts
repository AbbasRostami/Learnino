import { api } from "@/hooks/upfetch";
import type { ApiError, ToggleCourseFavoriteResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseToggleCourseFavoriteOptions {
  onSuccessCallback?: (isFavorite: boolean) => void;
}

export const useToggleCourseFavorite = ({
  onSuccessCallback,
}: UseToggleCourseFavoriteOptions = {}) => {
  const t = useTranslations("favorite");
  const queryClient = useQueryClient();

  return useMutation<ToggleCourseFavoriteResponse, ApiError, string>({
    mutationFn: (courseId) =>
      api<ToggleCourseFavoriteResponse>(`/favorites/courses/${courseId}`, {
        method: "POST",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("toggleSuccess"));

      const isFav = response.data.isFavorite;

      queryClient.invalidateQueries({ queryKey: ["favorite-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });

      onSuccessCallback?.(isFav);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
