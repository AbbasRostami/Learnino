import { api } from "@/lib/upfetch";
import type {
  ApiError,
  ToggleReactionPayload,
  ToggleReactionResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCourseReactionOptions {
  onSuccessCallback?: (data: ToggleReactionResponse["data"]) => void;
}

export const useCourseReaction = ({
  onSuccessCallback,
}: UseCourseReactionOptions = {}) => {
  const t = useTranslations("reaction");
  const queryClient = useQueryClient();

  return useMutation<ToggleReactionResponse, ApiError, ToggleReactionPayload>({
    mutationFn: ({ id, type }) =>
      api<ToggleReactionResponse>(`/courses/${id}/reaction`, {
        method: "POST",
        body: { type },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("reactionUpdated"));

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });

      onSuccessCallback?.(response.data);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
