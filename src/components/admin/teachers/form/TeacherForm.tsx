"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  getCreateTeacherSchema,
  getUpdateTeacherSchema,
  type CreateTeacherFormValues,
  type UpdateTeacherFormValues,
} from "@/schemas";
import { useCreateTeacher, useUpdateTeacher } from "@/services";
import type { TeacherListItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TeacherAvatarField } from "./TeacherAvatarField";

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
  const tTeacher = useTranslations("teacher");
  const isEdit = Boolean(teacher);

  const schema = isEdit
    ? getUpdateTeacherSchema(tTeacher)
    : getCreateTeacherSchema(tTeacher);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTeacherFormValues | UpdateTeacherFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      nameFa: "",
      nameEn: "",
      bioFa: "",
      bioEn: "",
      avatar: null,
      ...(isEdit ? {} : { show: true }),
    },
  });

  const { mutate: createTeacher, isPending: isCreating } = useCreateTeacher({
    onSuccessCallback: () => {
      onSuccess?.();
      reset();
    },
  });

  const { mutate: updateTeacher, isPending: isUpdating } = useUpdateTeacher({
    onSuccessCallback: () => {
      onSuccess?.();
      reset();
    },
  });

  const isPending = isCreating || isUpdating;
  useEffect(() => {
    if (teacher) {
      reset({
        nameFa: teacher.name || "",
        nameEn: teacher.name || "",
        bioFa: teacher.bio || "",
        bioEn: teacher.bio || "",
        avatar: null,
      });
    } else {
      reset({
        nameFa: "",
        nameEn: "",
        bioFa: "",
        bioEn: "",
        avatar: null,
        show: true,
      });
    }
  }, [teacher?.id]);

  const onSubmit = (
    data: CreateTeacherFormValues | UpdateTeacherFormValues,
  ) => {
    const trimOrUndef = (v?: string | null) =>
      v && typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

    if (isEdit && teacher) {
      updateTeacher({
        id: teacher.id,
        nameFa: trimOrUndef(data?.nameFa),
        nameEn: trimOrUndef(data?.nameEn),
        bioFa: trimOrUndef(data?.bioFa as string | undefined),
        bioEn: trimOrUndef(data?.bioEn as string | undefined),
        avatar: data?.avatar instanceof File ? data.avatar : undefined,
      });
    } else {
      const d = data as CreateTeacherFormValues;
      createTeacher({
        nameFa: (d?.nameFa ?? "").trim(),
        nameEn: (d?.nameEn ?? "").trim(),
        bioFa: trimOrUndef(d?.bioFa),
        bioEn: trimOrUndef(d?.bioEn),
        show: d?.show ?? true,
        avatar: d?.avatar instanceof File ? d.avatar : undefined,
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
        name="avatar"
        render={({ field }) => (
          <TeacherAvatarField
            currentAvatarUrl={teacher?.avatar}
            fallbackName={teacher?.name}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors?.avatar?.message as string}
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
        <Label htmlFor="bioFa" className="text-xs font-bold">
          {t("bioFaLabel")}
        </Label>
        <textarea
          id="bioFa"
          {...register("bioFa")}
          placeholder={t("bioFaPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold bg-background border border-border/60 px-3 py-2 resize-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          dir="rtl"
          disabled={isPending}
        />
        {errors?.bioFa?.message && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.bioFa.message as string}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bioEn" className="text-xs font-bold">
          {t("bioEnLabel")}
        </Label>
        <textarea
          id="bioEn"
          {...register("bioEn")}
          placeholder={t("bioEnPlaceholder")}
          rows={3}
          className="w-full rounded-xl text-xs font-semibold font-mono bg-background border border-border/60 px-3 py-2 resize-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          dir="ltr"
          disabled={isPending}
        />
        {errors?.bioEn?.message && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.bioEn.message as string}
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
