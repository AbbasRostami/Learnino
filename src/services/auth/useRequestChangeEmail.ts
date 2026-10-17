import { api } from "@/lib/upfetch";
import type {
  ApiError,
  RequestChangeEmailPayload,
  RequestChangeEmailResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseRequestChangeEmailOptions {
  onSuccessCallback?: (newEmail: string) => void;
}

export const useRequestChangeEmail = ({
  onSuccessCallback,
}: UseRequestChangeEmailOptions = {}) => {
  const t = useTranslations("auth");

  return useMutation<
    RequestChangeEmailResponse,
    ApiError,
    RequestChangeEmailPayload
  >({
    mutationFn: (data) =>
      api<RequestChangeEmailResponse>("/auth/request-change-email", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response?.data?.message);
      onSuccessCallback?.(response?.data?.newEmail);
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};
