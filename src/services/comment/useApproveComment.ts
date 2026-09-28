import { api } from "@/hooks/upfetch";
import type { ApiError, ApproveCommentResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseApproveCommentOptions {
  onSuccessCallback?: () => void;
}

export const useApproveComment = ({
  onSuccessCallback,
}: UseApproveCommentOptions = {}) => {
  const t = useTranslations("comment");
  const queryClient = useQueryClient();

  return useMutation<ApproveCommentResponse, ApiError, string>({
    mutationFn: (commentId) =>
      api<ApproveCommentResponse>(`/comments/${commentId}/approve`, {
        method: "PATCH",
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("approveSuccess"));

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