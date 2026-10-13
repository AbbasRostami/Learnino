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
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <CourseImageField
            currentImageUrl={course?.imageUrl}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors?.image?.message}
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
            <span className="text-xs font-bold text-rose-500">
              {errors?.titleFa?.message}
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
            className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.titleEn}
          />
          {errors?.titleEn?.message && (
            <span className="text-xs font-bold text-rose-500">
              {errors?.titleEn?.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="descriptionFa" className="text-xs font-bold">
          {t("descriptionFaLabel")}
        </Label>
        <Textarea
          id="descriptionFa"
          {...register("descriptionFa")}
          placeholder={t("descriptionFaPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2"
          dir="rtl"
          disabled={isPending}
        />
        {errors?.descriptionFa?.message && (
          <span className="text-xs font-bold text-rose-500">
            {errors?.descriptionFa?.message}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="descriptionEn" className="text-xs font-bold">
          {t("descriptionEnLabel")}
        </Label>
        <Textarea
          id="descriptionEn"
          {...register("descriptionEn")}
          placeholder={t("descriptionEnPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2"
          dir="ltr"
          disabled={isPending}
        />
        {errors?.descriptionEn?.message && (
          <span className="text-xs font-bold text-rose-500">
            {errors?.descriptionEn?.message}
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
            step={10000}
            {...register("price", { valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
            className="h-11 py-0 rounded-xl text-xs font-bold bg-background border-border/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.price}
          />
          {errors?.price?.message && (
            <span className="text-xs font-bold text-rose-500">
              {errors?.price?.message}
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
                value={field.value || "BEGINNER"}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60">
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
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={!!errors?.categoryId}
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
            )}
          />
          {errors?.categoryId?.message && (
            <span className="text-xs font-bold text-rose-500">
              {errors.categoryId.message}
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
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={!!errors?.teacherId}
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
            )}
          />
          {errors?.teacherId?.message && (
            <span className="text-xs font-bold text-rose-500">
              {errors?.teacherId?.message}
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
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
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
