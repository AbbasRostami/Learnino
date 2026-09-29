import { api } from "@/hooks/upfetch";
import type { TogglePostFavoriteResponse } from "@/types";
import type { ApiError } from "@/types/api/error.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseTogglePostFavoriteOptions {
  onSuccessCallback?: (isFavorite: boolean) => void;
}

export const useTogglePostFavorite = ({
  onSuccessCallback,
}: UseTogglePostFavoriteOptions = {}) => {
  const t = useTranslations("favorite");
  const queryClient = useQueryClient();

  return useMutation<TogglePostFavoriteResponse, ApiError, string>({
    mutationFn: (postId) =>
      api<TogglePostFavoriteResponse>(`/favorites/posts/${postId}`, {
        method: "POST",
      }),

    onSuccess: (response) => {
      toast.success(response?.data?.message || t("toggleSuccess"));

      const isFav = response?.data?.isFavorite;

      queryClient.invalidateQueries({ queryKey: ["favorite-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
