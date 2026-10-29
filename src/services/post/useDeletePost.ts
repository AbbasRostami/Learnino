import { revalidatePostsAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type { ApiError, DeletePostResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeletePostOptions {
  onSuccessCallback?: () => void;
}

export const useDeletePost = ({
  onSuccessCallback,
}: UseDeletePostOptions = {}) => {
  const t = useTranslations("post");
  const queryClient = useQueryClient();

  return useMutation<DeletePostResponse, ApiError, string>({
    mutationFn: (postId) =>
      api<DeletePostResponse>(`/posts/${postId}`, {
        method: "DELETE",
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("deleteSuccess"));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "posts"],
      });

      void revalidatePostsAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
