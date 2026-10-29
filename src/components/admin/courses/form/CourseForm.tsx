"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { CourseImageField } from "./CourseImageField";
import { useCourseForm } from "./useCourseForm";

interface CourseFormProps {
  course?: Course | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const t = useTranslations("admin.courses.form");

  const {
    form,
    isEdit,
    isPending,
    onSubmit,
    categoryOptions,
    teacherOptions,
    levelOptions,
  } = useCourseForm({ course, onSuccess });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
      noValidate
    >
      <FieldGroup>
        <Controller
          control={control}
          name="image"
          render={({ field, fieldState }) => (
            <CourseImageField
              currentImageUrl={course?.imageUrl}
              value={field.value ?? null}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={isPending}
              error={fieldState.error?.message}
              invalid={fieldState.invalid}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field data-invalid={!!errors.titleFa} className="gap-1.5">
            <FieldLabel htmlFor="titleFa" className="text-xs font-bold">
              {t("titleFaLabel")}{" "}
              {!isEdit && <span className="text-rose-500">*</span>}
            </FieldLabel>
            <Input
              id="titleFa"
              {...register("titleFa")}
              placeholder={t("titleFaPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="rtl"
              disabled={isPending}
              aria-invalid={!!errors.titleFa}
            />
            {errors.titleFa && (
              <FieldError id="titleFa-error" errors={[errors.titleFa]} />
            )}
          </Field>

          <Field data-invalid={!!errors.titleEn} className="gap-1.5">
            <FieldLabel htmlFor="titleEn" className="text-xs font-bold">
              {t("titleEnLabel")}{" "}
              {!isEdit && <span className="text-rose-500">*</span>}
            </FieldLabel>
            <Input
              id="titleEn"
              {...register("titleEn")}
              placeholder={t("titleEnPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.titleEn}
            />
            {errors.titleEn && (
              <FieldError id="titleEn-error" errors={[errors.titleEn]} />
            )}
          </Field>
        </div>

        <Field data-invalid={!!errors.descriptionFa} className="gap-1.5">
          <FieldLabel htmlFor="descriptionFa" className="text-xs font-bold">
            {t("descriptionFaLabel")}
          </FieldLabel>
          <Textarea
            id="descriptionFa"
            {...register("descriptionFa")}
            placeholder={t("descriptionFaPlaceholder")}
            rows={3}
            className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2"
            dir="rtl"
            disabled={isPending}
            aria-invalid={!!errors.descriptionFa}
          />
          {errors.descriptionFa && (
            <FieldError
              id="descriptionFa-error"
              errors={[errors.descriptionFa]}
            />
          )}
        </Field>

        <Field data-invalid={!!errors.descriptionEn} className="gap-1.5">
          <FieldLabel htmlFor="descriptionEn" className="text-xs font-bold">
            {t("descriptionEnLabel")}
          </FieldLabel>
          <Textarea
            id="descriptionEn"
            {...register("descriptionEn")}
            placeholder={t("descriptionEnPlaceholder")}
            rows={3}
            className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.descriptionEn}
          />
          {errors.descriptionEn && (
            <FieldError
              id="descriptionEn-error"
              errors={[errors.descriptionEn]}
            />
          )}
        </Field>
      </FieldGroup>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field data-invalid={!!errors.price} className="gap-1.5">
          <FieldLabel htmlFor="price" className="text-xs font-bold">
            {t("priceLabel")}
          </FieldLabel>
          <Input
            id="price"
            type="number"
            min={0}
            step={10000}
            {...register("price", { valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
            className="h-11 py-0 rounded-xl text-xs font-bold bg-background border-border/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.price}
          />
          {errors.price && (
            <FieldError id="price-error" errors={[errors.price]} />
          )}
        </Field>

        <Field data-invalid={!!errors.level} className="gap-1.5">
          <FieldLabel htmlFor="level" className="text-xs font-bold">
            {t("levelLabel")}
          </FieldLabel>
          <Controller
            control={control}
            name="level"
            render={({ field, fieldState }) => (
              <>
                <Select
                  items={levelOptions}
                  value={field.value || "BEGINNER"}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id="level"
                    className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                    aria-invalid={fieldState.invalid}
                    onBlur={field.onBlur}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="rounded-xl"
                  >
                    <SelectGroup>
                      {levelOptions?.map((opt) => (
                        <SelectItem
                          key={opt?.value}
                          value={opt?.value}
                          className="text-xs font-bold cursor-pointer"
                        >
                          {opt?.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FieldError id="level-error" errors={[fieldState.error]} />
                )}
              </>
            )}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Controller
          control={control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="categoryId" className="text-xs font-bold">
                {t("categoryLabel")}{" "}
                {!isEdit && <span className="text-rose-500">*</span>}
              </FieldLabel>
              <Select
                items={[
                  { value: "", label: t("categoryPlaceholder") },
                  ...categoryOptions,
                ]}
                value={field.value || ""}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id="categoryId"
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder={t("categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="rounded-xl"
                >
                  <SelectGroup>
                    {categoryOptions?.map((opt) => (
                      <SelectItem
                        key={opt?.value}
                        value={opt?.value}
                        className="text-xs font-bold cursor-pointer"
                      >
                        {opt?.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error && (
                <FieldError id="categoryId-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="teacherId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="teacherId" className="text-xs font-bold">
                {t("teacherLabel")}{" "}
                {!isEdit && <span className="text-rose-500">*</span>}
              </FieldLabel>
              <Select
                items={[
                  { value: "", label: t("teacherPlaceholder") },
                  ...teacherOptions,
                ]}
                value={field.value || ""}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id="teacherId"
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder={t("teacherPlaceholder")} />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="rounded-xl"
                >
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
              {fieldState.error && (
                <FieldError id="teacherId-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>

      <Controller
        control={control}
        name="published"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex-row items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30"
          >
            <Switch
              id="published"
              name={field.name}
              checked={!!field.value}
              onBlur={field.onBlur}
              onCheckedChange={field.onChange}
              disabled={isPending}
              aria-invalid={fieldState.invalid}
            />
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <FieldLabel
                htmlFor="published"
                className="text-xs font-bold cursor-pointer"
              >
                {t("publishedLabel")}
              </FieldLabel>
              <FieldDescription
                id="published-description"
                className="text-xs font-semibold leading-relaxed"
              >
                {t("publishedDescription")}
              </FieldDescription>
              {fieldState.error && (
                <FieldError id="published-error" errors={[fieldState.error]} />
              )}
            </div>
          </Field>
        )}
      />

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
