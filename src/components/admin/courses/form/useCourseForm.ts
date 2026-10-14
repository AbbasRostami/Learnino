import { getCreateCourseSchema, type CreateCourseFormValues } from "@/schemas";
import {
  useAdminCategories,
  useAdminTeachers,
  useCreateCourse,
  useUpdateCourse,
} from "@/services";
import type { Course } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, type Resolver } from "react-hook-form";

interface UseCourseFormProps {
  course?: Course | null;
  onSuccess: () => void;
}

export function useCourseForm({ course, onSuccess }: UseCourseFormProps) {
  const tCourse = useTranslations("course");
  const tLevels = useTranslations("admin.courses.levels");
  const isEdit = Boolean(course);

  const { data: categoriesData } = useAdminCategories({ limit: 100 });
  const { data: teachersData } = useAdminTeachers({ limit: 100 });

  const categories = categoriesData?.data?.items ?? [];
  const teachers = teachersData?.data?.items ?? [];

  const categoryOptions = categories?.map((c) => ({
    value: c?.id,
    label: c?.name,
  }));

  const teacherOptions = teachers?.map((t) => ({
    value: t?.id,
    label: t?.name,
  }));

  const levelOptions = [
    { value: "BEGINNER", label: tLevels("BEGINNER") },
    { value: "INTERMEDIATE", label: tLevels("INTERMEDIATE") },
    { value: "ADVANCED", label: tLevels("ADVANCED") },
  ];

  const schema = getCreateCourseSchema(tCourse);

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(schema) as Resolver<CreateCourseFormValues>,
    mode: "onChange",
    values: {
      titleFa: course?.titleFa || "",
      titleEn: course?.titleEn || "",
      descriptionFa: course?.descriptionFa || "",
      descriptionEn: course?.descriptionEn || "",
      price: course?.price ?? 0,
      level: course?.level || "BEGINNER",
      categoryId: course?.category?.id || "",
      teacherId: course?.teacher?.id || "",
      published: course?.published ?? false,
      image: null,
    },
  });

  const { mutate: createCourse, isPending: isCreating } = useCreateCourse({
    onSuccessCallback: () => {
      onSuccess?.();
    },
  });

  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccessCallback: () => {
      onSuccess?.();
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CreateCourseFormValues) => {
    if (isEdit && course) {
      updateCourse({
        id: course.id,
        ...data,
      });
    } else {
      createCourse(data);
    }
  };

  return {
    form,
    isEdit,
    isPending,
    onSubmit,
    categoryOptions,
    teacherOptions,
    levelOptions,
  };
}
