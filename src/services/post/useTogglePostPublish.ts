import { api } from "@/lib/upfetch";
import type {
  ApiError,
  TogglePostPublishPayload,
  TogglePostPublishResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseTogglePostPublishOptions {
  onSuccessCallback?: () => void;
}

export const useTogglePostPublish = ({
  onSuccessCallback,
}: UseTogglePostPublishOptions = {}) => {
  const t = useTranslations("post");
  const queryClient = useQueryClient();

  return useMutation<
    TogglePostPublishResponse,
    ApiError,
    TogglePostPublishPayload
  >({
    mutationFn: ({ id, published }) =>
      api<TogglePostPublishResponse>(`/posts/${id}/publish`, {
        method: "PATCH",
        body: { published },
      }),

    onSuccess: (response) => {
      toast.success(response.data.message || t("publishToggleSuccess"));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "posts"],
      });

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
