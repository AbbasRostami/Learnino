import { useRouter } from "@/i18n/routing";
import { api } from "@/lib/upfetch";
import { useSyncCart } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { ApiError, VerifyEmailPayload, VerifyEmailResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseVerifyEmailOptions {
  redirectTo?: string;
}

export const useVerifyEmail = ({
  redirectTo = "/",
}: UseVerifyEmailOptions = {}) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const queryClient = useQueryClient();
  const { mutateAsync: syncCart } = useSyncCart();

  return useMutation<VerifyEmailResponse, ApiError, VerifyEmailPayload>({
    mutationFn: (data) =>
      api<VerifyEmailResponse>("/auth/verify-email", {
        method: "POST",
        body: data,
      }),

    onSuccess: async (response) => {
      toast.success(response.data.message || t("welcomeMessage"));
      setAuthenticated(true);

      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("learnino_guest_cart");
          const parsed: (string | { courseId?: string; id?: string })[] = stored
            ? JSON.parse(stored)
            : [];

          const guestCourseIds = parsed
            .map((item) =>
              typeof item === "string" ? item : item.courseId || item.id,
            )
            .filter((id): id is string => Boolean(id));

          if (guestCourseIds.length > 0) {
            await syncCart({ courseIds: guestCourseIds });
            localStorage.removeItem("learnino_guest_cart");
            window.dispatchEvent(new Event("cart-updated"));
          }
        }
      } catch (err) {
        console.error("Failed to sync guest cart on verify email:", err);
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push(redirectTo);
    },

    onError: (error) => {
      toast.error(error.message || t("errorGeneral"));
    },
  });
};
