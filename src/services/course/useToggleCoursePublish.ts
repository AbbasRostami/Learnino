import { revalidateCoursesAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type {
  ApiError,
  ToggleCoursePublishPayload,
  ToggleCoursePublishResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseToggleCoursePublishOptions {
  onSuccessCallback?: () => void;
}

export const useToggleCoursePublish = ({
  onSuccessCallback,
}: UseToggleCoursePublishOptions = {}) => {
  const t = useTranslations("course");
  const queryClient = useQueryClient();

  return useMutation<
    ToggleCoursePublishResponse,
    ApiError,
    ToggleCoursePublishPayload
  >({
    mutationFn: ({ id, published }) =>
      api<ToggleCoursePublishResponse>(`/courses/${id}/publish`, {
        method: "PATCH",
        body: { published },
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("publishToggleSuccess"));

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "overview", "courses"],
      });

      void revalidateCoursesAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
