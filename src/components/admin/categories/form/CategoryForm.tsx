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
import type { CategoryWithCount } from "@/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useCategoryForm } from "./useCategoryForm";

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

  const { form, isEdit, isPending, onSubmit } = useCategoryForm({
    category,
    onSuccess,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
    >
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            name="nameFa"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel htmlFor="nameFa" className="text-xs font-bold">
                  {t("nameFaLabel")} <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="nameFa"
                  placeholder={t("nameFaPlaceholder")}
                  className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
                  dir="rtl"
                  disabled={isPending}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError id="nameFa-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="nameEn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel htmlFor="nameEn" className="text-xs font-bold">
                  {t("nameEnLabel")} <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="nameEn"
                  placeholder={t("nameEnPlaceholder")}
                  className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
                  dir="ltr"
                  disabled={isPending}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError id="nameEn-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="descriptionFa"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="descriptionFa" className="text-xs font-bold">
                {t("descriptionFaLabel")}
              </FieldLabel>
              <Textarea
                {...field}
                id="descriptionFa"
                placeholder={t("descriptionFaPlaceholder")}
                rows={3}
                className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
                dir="rtl"
                disabled={isPending}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  id="descriptionFa-error"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="descriptionEn"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="descriptionEn" className="text-xs font-bold">
                {t("descriptionEnLabel")}
              </FieldLabel>
              <Textarea
                {...field}
                id="descriptionEn"
                placeholder={t("descriptionEnPlaceholder")}
                rows={3}
                className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
                dir="ltr"
                disabled={isPending}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  id="descriptionEn-error"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {!isEdit && (
          <Controller
            name="show"
            control={form.control}
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
                  {fieldState.invalid && (
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
