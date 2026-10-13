import {
  getCreateTeacherSchema,
  type CreateTeacherFormValues,
} from "@/schemas";
import { useCreateTeacher, useUpdateTeacher } from "@/services";
import type { TeacherListItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";

interface UseTeacherFormProps {
  teacher?: TeacherListItem | null;
  onSuccess: () => void;
}

export function useTeacherForm({ teacher, onSuccess }: UseTeacherFormProps) {
  const tTeacher = useTranslations("teacher");
  const isEdit = Boolean(teacher);

  const schema = getCreateTeacherSchema(tTeacher);

  const form = useForm<CreateTeacherFormValues>({
    resolver: zodResolver(schema) as Resolver<CreateTeacherFormValues>,
    mode: "onChange",
    defaultValues: {
      nameFa: "",
      nameEn: "",
      bioFa: "",
      bioEn: "",
      avatar: null,
      show: true,
    },
  });

  useEffect(() => {
    if (teacher?.id) {
      form.reset({
        nameFa: teacher?.name || "",
        nameEn: teacher?.name || "",
        bioFa: teacher?.bio || "",
        bioEn: teacher?.bio || "",
        avatar: null,
        show: teacher?.show ?? true,
      });
    }
  }, [teacher?.id, form]);

  const { mutate: createTeacher, isPending: isCreating } = useCreateTeacher({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const { mutate: updateTeacher, isPending: isUpdating } = useUpdateTeacher({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CreateTeacherFormValues) => {
    if (isEdit && teacher) {
      updateTeacher({
        id: teacher.id,
        ...data,
      });
    } else {
      createTeacher(data);
    }
  };

  return {
    form,
    isEdit,
    isPending,
    onSubmit,
  };
}
