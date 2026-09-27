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
import {
  getCreateDiscountSchema,
  type CreateDiscountFormValues,
} from "@/schemas";
import { useCreateDiscount } from "@/services";
import type { DiscountType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

interface DiscountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function DiscountForm({ onSuccess, onCancel }: DiscountFormProps) {
  const t = useTranslations("admin.discounts.form");
  const tTypes = useTranslations("admin.discounts.types");
  const tDiscount = useTranslations("discount");

  const schema = getCreateDiscountSchema(tDiscount);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateDiscountFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      type: "PERCENTAGE",
      value: 10,
      maxUses: 100,
      expiresInDays: 30,
    },
  });

  const selectedType = watch("type");

  const { mutate: createDiscount, isPending } = useCreateDiscount({
    onSuccessCallback: () => {
      onSuccess();
      reset();
    },
  });

  const onSubmit = (data: CreateDiscountFormValues) => {
    createDiscount({
      code: data.code.toUpperCase().trim(),
      type: data.type as DiscountType,
      value: data.value,
      maxUses: data.maxUses,
      expiresInDays: data.expiresInDays,
    });
  };

  const typeOptions: { value: DiscountType; label: string }[] = [
    { value: "PERCENTAGE", label: tTypes("PERCENTAGE") },
    { value: "AMOUNT", label: tTypes("AMOUNT") },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
      noValidate
    >
      <div className="space-y-1.5">
        <Label htmlFor="code" className="text-xs font-bold">
          {t("codeLabel")}
        </Label>
        <Input
          id="code"
          {...register("code")}
          placeholder={t("codePlaceholder")}
          className="h-11 rounded-xl text-xs font-black font-mono bg-background border-border/60 uppercase tracking-wider"
          dir="ltr"
          disabled={isPending}
          aria-invalid={!!errors.code}
        />
        {errors.code?.message && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.code.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold">{t("typeLabel")}</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                items={typeOptions}
                value={field.value}
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
                    {typeOptions.map((opt) => (
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

        <div className="space-y-1.5">
          <Label htmlFor="value" className="text-xs font-bold">
            {t("valueLabel")} {selectedType === "AMOUNT" && "(ریال / RLS)"}
          </Label>
          <Input
            id="value"
            type="number"
            min={1}
            {...register("value", { valueAsNumber: true })}
            placeholder={
              selectedType === "PERCENTAGE"
                ? t("valuePercentagePlaceholder")
                : t("valueAmountPlaceholder")
            }
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.value}
          />
          {errors.value?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.value.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="maxUses" className="text-xs font-bold">
            {t("maxUsesLabel")}
          </Label>
          <Input
            id="maxUses"
            type="number"
            min={1}
            max={10000}
            {...register("maxUses", { valueAsNumber: true })}
            placeholder={t("maxUsesPlaceholder")}
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.maxUses}
          />
          {errors.maxUses?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.maxUses.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="expiresInDays" className="text-xs font-bold">
            {t("expiresInDaysLabel")}
          </Label>
          <Input
            id="expiresInDays"
            type="number"
            min={1}
            max={365}
            {...register("expiresInDays", { valueAsNumber: true })}
            placeholder={t("expiresInDaysPlaceholder")}
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.expiresInDays}
          />
          {errors.expiresInDays?.message && (
            <span className="text-[10px] font-bold text-rose-500">
              {errors.expiresInDays.message}
            </span>
          )}
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
          <span>{t("submitCreate")}</span>
        </Button>
      </div>
    </form>
  );
}
