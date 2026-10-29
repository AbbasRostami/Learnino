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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { TeacherListItem } from "@/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { TeacherAvatarField } from "./TeacherAvatarField";
import { useTeacherForm } from "./useTeacherForm";

interface TeacherFormProps {
  teacher?: TeacherListItem | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TeacherForm({
  teacher,
  onSuccess,
  onCancel,
}: TeacherFormProps) {
  const t = useTranslations("admin.teachers.form");

  const { form, isEdit, isPending, onSubmit } = useTeacherForm({
    teacher,
    onSuccess,
  });

  const {
    register,
    control,
    handleSubmit,
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
          name="avatar"
          render={({ field, fieldState }) => (
            <TeacherAvatarField
              currentAvatarUrl={teacher?.avatar}
              fallbackName={teacher?.name}
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
          <Field data-invalid={!!errors.nameFa} className="gap-1.5">
            <FieldLabel htmlFor="nameFa" className="text-xs font-bold">
              {t("nameFaLabel")}{" "}
              {!isEdit && <span className="text-rose-500">*</span>}
            </FieldLabel>
            <Input
              id="nameFa"
              {...register("nameFa")}
              placeholder={t("nameFaPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="rtl"
              disabled={isPending}
              aria-invalid={!!errors.nameFa}
            />
            {errors.nameFa && (
              <FieldError id="nameFa-error" errors={[errors.nameFa]} />
            )}
          </Field>

          <Field data-invalid={!!errors.nameEn} className="gap-1.5">
            <FieldLabel htmlFor="nameEn" className="text-xs font-bold">
              {t("nameEnLabel")}{" "}
              {!isEdit && <span className="text-rose-500">*</span>}
            </FieldLabel>
            <Input
              id="nameEn"
              {...register("nameEn")}
              placeholder={t("nameEnPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.nameEn}
            />
            {errors.nameEn && (
              <FieldError id="nameEn-error" errors={[errors.nameEn]} />
            )}
          </Field>
        </div>

        <Field data-invalid={!!errors.bioFa} className="gap-1.5">
          <FieldLabel htmlFor="bioFa" className="text-xs font-bold">
            {t("bioFaLabel")}
          </FieldLabel>
          <Textarea
            id="bioFa"
            {...register("bioFa")}
            placeholder={t("bioFaPlaceholder")}
            rows={3}
            className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
            dir="rtl"
            disabled={isPending}
            aria-invalid={!!errors.bioFa}
          />
          {errors.bioFa && (
            <FieldError id="bioFa-error" errors={[errors.bioFa]} />
          )}
        </Field>

        <Field data-invalid={!!errors.bioEn} className="gap-1.5">
          <FieldLabel htmlFor="bioEn" className="text-xs font-bold">
            {t("bioEnLabel")}
          </FieldLabel>
          <Textarea
            id="bioEn"
            {...register("bioEn")}
            placeholder={t("bioEnPlaceholder")}
            rows={3}
            className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.bioEn}
          />
          {errors.bioEn && (
            <FieldError id="bioEn-error" errors={[errors.bioEn]} />
          )}
        </Field>

        {!isEdit && (
          <Controller
            control={control}
            name="show"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex-row items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30"
              >
                <Switch
                  id="show"
                  name={field.name}
                  checked={field.value}
                  onBlur={field.onBlur}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  aria-invalid={fieldState.invalid}
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <FieldLabel
                    htmlFor="show"
                    className="text-xs font-bold cursor-pointer"
                  >
                    {t("showLabel")}
                  </FieldLabel>
                  <FieldDescription>{t("showDescription")}</FieldDescription>
                  {fieldState.error && (
                    <FieldError id="show-error" errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />
        )}
      </FieldGroup>

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
