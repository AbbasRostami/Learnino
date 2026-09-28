import { api } from "@/hooks/upfetch";
import type { ApiError, RejectCommentResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseRejectCommentOptions {
  onSuccessCallback?: () => void;
}

export const useRejectComment = ({
  onSuccessCallback,
}: UseRejectCommentOptions = {}) => {
  const t = useTranslations("comment");
  const queryClient = useQueryClient();

  return useMutation<RejectCommentResponse, ApiError, string>({
    mutationFn: (commentId) =>
      api<RejectCommentResponse>(`/comments/${commentId}/reject`, {
        method: "PATCH",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("rejectSuccess"));

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "comments"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "comments"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};