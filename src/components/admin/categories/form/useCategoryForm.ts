import {
  getCreateCategorySchema,
  type CreateCategoryFormValues,
} from "@/schemas";
import { useCreateCategory, useUpdateCategory } from "@/services";
import type { CategoryWithCount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";

interface UseCategoryFormProps {
  category?: CategoryWithCount | null;
  onSuccess: () => void;
}

export function useCategoryForm({ category, onSuccess }: UseCategoryFormProps) {
  const tCategory = useTranslations("category");
  const isEdit = Boolean(category);

  const schema = getCreateCategorySchema(tCategory);

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(schema) as Resolver<CreateCategoryFormValues>,
    mode: "onChange",
    defaultValues: {
      nameFa: "",
      nameEn: "",
      descriptionFa: "",
      descriptionEn: "",
      show: true,
    },
  });

  useEffect(() => {
    if (category?.id) {
      form.reset({
        nameFa: category?.name || "",
        nameEn: category?.name || "",
        descriptionFa: category?.description || "",
        descriptionEn: category?.description || "",
        show: category?.show ?? true,
      });
    }
  }, [category?.id, form]);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CreateCategoryFormValues) => {
    if (isEdit && category) {
      updateCategory({
        id: category.id,
        ...data,
      });
    } else {
      createCategory(data);
    }
  };

  return {
    form,
    isEdit,
    isPending,
    onSubmit,
  };
}
