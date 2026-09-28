import { api } from "@/hooks/upfetch";
import type { ApiError, DeleteCommentResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeleteCommentOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteComment = ({
  onSuccessCallback,
}: UseDeleteCommentOptions = {}) => {
  const t = useTranslations("comment");
  const queryClient = useQueryClient();

  return useMutation<DeleteCommentResponse, ApiError, string>({
    mutationFn: (commentId) =>
      api<DeleteCommentResponse>(`/comments/${commentId}`, {
        method: "DELETE",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("deleteSuccess"));

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "comments"] });
      queryClient.invalidateQueries({ queryKey: ["my-comments"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", "overview"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
