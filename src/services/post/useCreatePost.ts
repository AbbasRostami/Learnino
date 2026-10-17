import { api } from "@/lib/upfetch";
import type { ApiError, CreatePostPayload, CreatePostResponse } from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseCreatePostOptions {
  onSuccessCallback?: (postId: string) => void;
}

export const useCreatePost = ({
  onSuccessCallback,
}: UseCreatePostOptions = {}) => {
  const t = useTranslations("post");
  const queryClient = useQueryClient();

  return useMutation<CreatePostResponse, ApiError, CreatePostPayload>({
    mutationFn: (data) =>
      api<CreatePostResponse>("/posts", {
        method: "POST",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("createSuccess"));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "posts"],
      });

      onSuccessCallback?.(response.data.post.id);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
