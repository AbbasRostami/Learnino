import { revalidateTeachersAction } from "@/actions/revalidate";
import { api } from "@/lib/upfetch";
import type { ApiError, DeleteTeacherResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UseDeleteTeacherOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteTeacher = ({
  onSuccessCallback,
}: UseDeleteTeacherOptions = {}) => {
  const t = useTranslations("teacher");
  const queryClient = useQueryClient();

  return useMutation<DeleteTeacherResponse, ApiError, string>({
    mutationFn: (teacherId) =>
      api<DeleteTeacherResponse>(`/teachers/${teacherId}`, {
        method: "DELETE",
      }),

    onSuccess: async (response) => {
      toast.success(response?.data?.message || t("deleteSuccess"));

      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "teachers"] });

      void revalidateTeachersAction();

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(error?.message || t("errorGeneral"));
    },
  });
};
