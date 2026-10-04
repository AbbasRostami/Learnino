import { api } from "@/hooks/upfetch";
import type {
  ApiError,
  ToggleReactionPayload,
  ToggleReactionResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCommentReactionOptions {
  onSuccessCallback?: (data: ToggleReactionResponse["data"]) => void;
}

export const useCommentReaction = ({
  onSuccessCallback,
}: UseCommentReactionOptions = {}) => {
  const t = useTranslations("reaction");
  const queryClient = useQueryClient();

  return useMutation<ToggleReactionResponse, ApiError, ToggleReactionPayload>({
    mutationFn: ({ id, type }) =>
      api<ToggleReactionResponse>(`/comments/${id}/reaction`, {
        method: "POST",
        body: { type },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("reactionUpdated"));

      queryClient.invalidateQueries({ queryKey: ["comments"] });

      onSuccessCallback?.(response.data);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
