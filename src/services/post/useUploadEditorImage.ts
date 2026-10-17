import { api } from "@/lib/upfetch";
import type {
  ApiError,
  UploadEditorImagePayload,
  UploadEditorImageResponse,
} from "@/types";
import { objectToFormData } from "@/utils/formData";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseUploadEditorImageOptions {
  onSuccessCallback?: (url: string) => void;
}

export const useUploadEditorImage = ({
  onSuccessCallback,
}: UseUploadEditorImageOptions = {}) => {
  const t = useTranslations("post");

  return useMutation<
    UploadEditorImageResponse,
    ApiError,
    UploadEditorImagePayload
  >({
    mutationFn: (data) =>
      api<UploadEditorImageResponse>("/uploads/editor-image", {
        method: "POST",
        body: objectToFormData(data),
      }),

    onSuccess: (response) => {
      toast.success(t("editorImageUploaded"));
      onSuccessCallback?.(response.data.url);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
