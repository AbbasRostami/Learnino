import { api } from "@/lib/upfetch";
import type {
  ApiError,
  ToggleReactionPayload,
  ToggleReactionResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const usePostReaction = (postSlug?: string) => {
  const t = useTranslations("reaction");
  const queryClient = useQueryClient();

  return useMutation<ToggleReactionResponse, ApiError, ToggleReactionPayload>({
    mutationFn: ({ id, type }) =>
      api<ToggleReactionResponse>(`/posts/${id}/reaction`, {
        method: "POST",
        body: { type },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("reactionUpdated"));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (postSlug) {
        queryClient.invalidateQueries({ queryKey: ["posts", postSlug] });
        queryClient.invalidateQueries({ queryKey: ["post", postSlug] });
      }
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
