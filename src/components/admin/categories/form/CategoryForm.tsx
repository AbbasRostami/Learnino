"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  getCreateCategorySchema,
  getUpdateCategorySchema,
  type CreateCategoryFormValues,
  type UpdateCategoryFormValues,
} from "@/schemas";
import { useCreateCategory, useUpdateCategory } from "@/services";
import type { CategoryWithCount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface CategoryFormProps {
  category?: CategoryWithCount | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CategoryForm({
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const t = useTranslations("admin.categories.form");
  const tCategory = useTranslations("category");
  const isEdit = Boolean(category);

  const schema = isEdit
    ? getUpdateCategorySchema(tCategory)
    : getCreateCategorySchema(tCategory);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryFormValues | UpdateCategoryFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      nameFa: "",
      nameEn: "",
      descriptionFa: "",
      descriptionEn: "",
      ...(isEdit ? {} : { show: true }),
    },
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory({
    onSuccessCallback: () => {
      onSuccess();
      reset();
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory({
    onSuccessCallback: () => {
      onSuccess();
      reset();
    },
  });

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (category) {
      reset({
        nameFa: category?.name || "",
        nameEn: category?.name || "",
        descriptionFa: category?.description || "",
        descriptionEn: category?.description || "",
      });
    }
  }, [category, reset]);

  const onSubmit = (
    data: CreateCategoryFormValues | UpdateCategoryFormValues,
  ) => {
    const trimOrUndef = (v?: string | null) =>
      v && typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

    if (isEdit && category) {
      updateCategory({
        id: category?.id,
        nameFa: trimOrUndef(data.nameFa),
        nameEn: trimOrUndef(data.nameEn),
        descriptionFa: trimOrUndef(data.descriptionFa),
        descriptionEn: trimOrUndef(data.descriptionEn),
      });
    } else {
      const createData = data as CreateCategoryFormValues;
      createCategory({
        nameFa: createData?.nameFa.trim(),
        nameEn: createData?.nameEn.trim(),
        descriptionFa: trimOrUndef(createData?.descriptionFa),
        descriptionEn: trimOrUndef(createData?.descriptionEn),
        show: createData?.show ?? true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="nameFa" className="text-xs font-bold">
            {t("nameFaLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Input
            id="nameFa"
            {...register("nameFa")}
            placeholder={t("nameFaPlaceholder")}
            className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
            dir="rtl"
            disabled={isPending}
            aria-invalid={!!errors?.nameFa}
          />
          {errors?.nameFa?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors?.nameFa?.message as string}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nameEn" className="text-xs font-bold">
            {t("nameEnLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Input
            id="nameEn"
            {...register("nameEn")}
            placeholder={t("nameEnPlaceholder")}
            className="h-11 rounded-xl text-xs font-semibold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.nameEn}
          />
          {errors?.nameEn?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors?.nameEn?.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="descriptionFa" className="text-xs font-bold">
          {t("descriptionFaLabel")}
        </Label>
        <textarea
          id="descriptionFa"
          {...register("descriptionFa")}
          placeholder={t("descriptionFaPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          dir="rtl"
          disabled={isPending}
        />
        {errors?.descriptionFa?.message && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.descriptionFa.message as string}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="descriptionEn" className="text-xs font-bold">
          {t("descriptionEnLabel")}
        </Label>
        <textarea
          id="descriptionEn"
          {...register("descriptionEn")}
          placeholder={t("descriptionEnPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold font-mono bg-background border border-border/60 px-3 py-2 resize-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          dir="ltr"
          disabled={isPending}
        />
        {errors?.descriptionEn?.message && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.descriptionEn.message as string}
          </span>
        )}
      </div>

      {!isEdit && (
        <div className="flex items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30">
          <Controller
            control={control}
            name="show"
            render={({ field }) => (
              <Switch
                id="show"
                checked={!!field.value}
                onCheckedChange={field.onChange}
                disabled={isPending}
              />
            )}
          />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <Label htmlFor="show" className="text-xs font-bold cursor-pointer">
              {t("showLabel")}
            </Label>
            <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
              {t("showDescription")}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold cursor-pointer"
        >
          {t("cancel")}
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-white"
        >
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          <span>{isEdit ? t("submitEdit") : t("submitCreate")}</span>
        </Button>
      </div>
    </form>
  );
}
