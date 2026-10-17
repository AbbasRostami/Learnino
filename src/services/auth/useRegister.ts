import { api } from "@/lib/upfetch";
import type { ApiError, RegisterPayload, RegisterResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseRegisterOptions {
  onSuccessCallback?: (email: string) => void;
}

export const useRegister = ({ onSuccessCallback }: UseRegisterOptions = {}) => {
  const t = useTranslations("auth");

  return useMutation<RegisterResponse, ApiError, RegisterPayload>({
    mutationFn: (data) =>
      api<RegisterResponse>("/auth/register", {
        method: "POST",
        body: data,
      }),

    onSuccess: (response) => {
      toast.success(response.data.message);
      onSuccessCallback?.(response.data.email);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
