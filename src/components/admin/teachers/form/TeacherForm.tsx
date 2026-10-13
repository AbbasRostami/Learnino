"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (
          <TeacherAvatarField
            currentAvatarUrl={teacher?.avatar}
            fallbackName={teacher?.name}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors?.avatar?.message}
          />
        )}
      />

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
            <span className="text-xs font-bold text-rose-500">
              {errors.nameFa.message}
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
            className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors?.nameEn}
          />
          {errors?.nameEn?.message && (
            <span className="text-xs font-bold text-rose-500">
              {errors.nameEn.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bioFa" className="text-xs font-bold">
          {t("bioFaLabel")}
        </Label>
        <Textarea
          id="bioFa"
          {...register("bioFa")}
          placeholder={t("bioFaPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
          dir="rtl"
          disabled={isPending}
        />
        {errors?.bioFa?.message && (
          <span className="text-xs font-bold text-rose-500">
            {errors?.bioFa?.message}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bioEn" className="text-xs font-bold">
          {t("bioEnLabel")}
        </Label>
        <Textarea
          id="bioEn"
          {...register("bioEn")}
          placeholder={t("bioEnPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none"
          dir="ltr"
          disabled={isPending}
        />
        {errors?.bioEn?.message && (
          <span className="text-xs font-bold text-rose-500">
            {errors?.bioEn?.message}
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
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
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
