import { revalidatePostsAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type { ApiError, UpdatePostPayload, UpdatePostResponse } from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUpdatePostOptions {
  onSuccessCallback?: () => void;
}

export const useUpdatePost = ({
  onSuccessCallback,
}: UseUpdatePostOptions = {}) => {
  const t = useTranslations("post");
  const queryClient = useQueryClient();

  return useMutation<UpdatePostResponse, ApiError, UpdatePostPayload>({
    mutationFn: ({ id, ...data }) =>
      api<UpdatePostResponse>(`/posts/${id}`, {
        method: "PUT",
        body: objectToFormData(data),
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("updateSuccess"));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });

      void revalidatePostsAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
