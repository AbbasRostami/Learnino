import { api } from "@/lib/upfetch";
import type {
  ApiError,
  CreateCommentPayload,
  CreateCommentResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreateCommentOptions {
  onSuccessCallback?: () => void;
}

export const useCreateComment = ({
  onSuccessCallback,
}: UseCreateCommentOptions = {}) => {
  const t = useTranslations("comment");
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, ApiError, CreateCommentPayload>({
    mutationFn: (data) =>
      api<CreateCommentResponse>("/comments", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("submitPendingSuccess"));

      queryClient.invalidateQueries({ queryKey: ["my-comments"] });
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
