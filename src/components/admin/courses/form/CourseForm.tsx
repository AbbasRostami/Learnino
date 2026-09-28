"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  getCreateCourseSchema,
  getUpdateCourseSchema,
  type CreateCourseFormValues,
  type UpdateCourseFormValues,
} from "@/schemas";
import {
  useAdminCategories,
  useAdminTeachers,
  useCreateCourse,
  useUpdateCourse,
} from "@/services";
import type { Course, CourseLevel } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CourseImageField } from "./CourseImageField";

interface CourseFormProps {
  course?: Course | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const t = useTranslations("admin.courses.form");
  const tCourse = useTranslations("course");
  const tLevels = useTranslations("admin.courses.levels");
  const isEdit = Boolean(course);

  const schema = isEdit
    ? getUpdateCourseSchema(tCourse)
    : getCreateCourseSchema(tCourse);

  const { data: categoriesData } = useAdminCategories({ limit: 100 });
  const { data: teachersData } = useAdminTeachers({ limit: 100 });

  const categories = categoriesData?.data?.items ?? [];
  const teachers = teachersData?.data?.items ?? [];

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const teacherOptions = teachers.map((t) => ({
    value: t.id,
    label: t.name,
  }));
  const levelOptions = [
    { value: "BEGINNER", label: tLevels("BEGINNER") },
    { value: "INTERMEDIATE", label: tLevels("INTERMEDIATE") },
    { value: "ADVANCED", label: tLevels("ADVANCED") },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCourseFormValues | UpdateCourseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titleFa: "",
      titleEn: "",
      descriptionFa: "",
      descriptionEn: "",
      price: 0,
      level: "BEGINNER",
      categoryId: "",
      teacherId: "",
      published: false,
      image: null,
    },
  });

  useEffect(() => {
    if (course) {
      reset({
        titleFa: course?.title || "",
        titleEn: course?.title || "",
        descriptionFa: course?.description || "",
        descriptionEn: course?.description || "",
        price: course?.price ?? 0,
        level: course?.level || "BEGINNER",
        categoryId: course?.category?.id || "",
        teacherId: course?.teacher?.id || "",
        published: course?.published ?? false,
        image: null,
      });
    }
  }, [course, reset]);

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

  const onSubmit = (
    data: CreateCourseFormValues | UpdateCourseFormValues
  ) => {
    const trimOrUndef = (v?: string | null) =>
      v && typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

    if (isEdit && course) {
      updateCourse({
        id: course.id,
        titleFa: trimOrUndef(data?.titleFa),
        titleEn: trimOrUndef(data?.titleEn),
        descriptionFa: trimOrUndef(data?.descriptionFa),
        descriptionEn: trimOrUndef(data?.descriptionEn),
        price: typeof data?.price === "number" ? data.price : undefined,
        level: data?.level as CourseLevel | undefined,
        categoryId: data?.categoryId || undefined,
        teacherId: data?.teacherId || undefined,
        published:
          typeof data?.published === "boolean" ? data.published : undefined,
        image: data?.image instanceof File ? data.image : undefined,
      });
    } else {
      const d = data as CreateCourseFormValues;
      createCourse({
        titleFa: (d?.titleFa ?? "").trim(),
        titleEn: (d?.titleEn ?? "").trim(),
        descriptionFa: trimOrUndef(d?.descriptionFa),
        descriptionEn: trimOrUndef(d?.descriptionEn),
        price: d?.price ?? 0,
        level: (d?.level as CourseLevel) ?? "BEGINNER",
        categoryId: d?.categoryId ?? "",
        teacherId: d?.teacherId ?? "",
        published: d?.published ?? false,
        image: d?.image instanceof File ? d.image : undefined,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
      noValidate
    >
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <CourseImageField
            currentImageUrl={course?.imageUrl}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors?.image?.message as string}
          />
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="titleFa" className="text-xs font-bold">
            {t("titleFaLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Input
            id="titleFa"
            {...register("titleFa")}
            placeholder={t("titleFaPlaceholder")}
            className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
            dir="rtl"
            disabled={isPending}
            aria-invalid={!!errors?.titleFa}
          />
          {errors?.titleFa?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.titleFa.message as string}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="titleEn" className="text-xs font-bold">
            {t("titleEnLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Input
            id="titleEn"
            {...register("titleEn")}
            placeholder={t("titleEnPlaceholder")}
            className="h-11 rounded-xl text-xs font-semibold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.titleEn}
          />
          {errors?.titleEn?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.titleEn.message as string}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="price" className="text-xs font-bold">
            {t("priceLabel")}
          </Label>
          <Input
            id="price"
            type="number"
            min={0}
            step={1000}
            {...register("price", { valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.price}
          />
          {errors?.price?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.price.message as string}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold">{t("levelLabel")}</Label>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select
                items={levelOptions}
                value={(field.value as string) || "BEGINNER"}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="rounded-xl">
                  <SelectGroup>
                    {levelOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs font-bold cursor-pointer"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold">
            {t("categoryLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                items={[
                  { value: "", label: t("categoryPlaceholder") },
                  ...categoryOptions,
                ]}
                value={(field.value as string) || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={!!errors?.categoryId}
                >
                  <SelectValue placeholder={t("categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="rounded-xl">
                  <SelectGroup>
                    {categoryOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs font-bold cursor-pointer"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.categoryId?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.categoryId.message as string}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold">
            {t("teacherLabel")}{" "}
            {!isEdit && <span className="text-rose-500">*</span>}
          </Label>
          <Controller
            control={control}
            name="teacherId"
            render={({ field }) => (
              <Select
                items={[
                  { value: "", label: t("teacherPlaceholder") },
                  ...teacherOptions,
                ]}
                value={(field.value as string) || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={!!errors?.teacherId}
                >
                  <SelectValue placeholder={t("teacherPlaceholder")} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="rounded-xl">
                  <SelectGroup>
                    {teacherOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs font-bold cursor-pointer"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.teacherId?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.teacherId.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30">
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <Switch
              id="published"
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <Label
            htmlFor="published"
            className="text-xs font-bold cursor-pointer"
          >
            {t("publishedLabel")}
          </Label>
          <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
            {t("publishedDescription")}
          </p>
        </div>
      </div>

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