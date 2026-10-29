"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useDiscountForm } from "./useDiscountForm";

interface DiscountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function DiscountForm({ onSuccess, onCancel }: DiscountFormProps) {
  const t = useTranslations("admin.discounts.form");

  const { form, selectedType, typeOptions, isPending, onSubmit, tDiscount } =
    useDiscountForm({ onSuccess });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-2" noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.code} className="gap-1.5">
          <FieldLabel htmlFor="code" className="text-xs font-bold">
            {t("codeLabel")}
          </FieldLabel>
          <Input
            id="code"
            {...register("code")}
            placeholder={t("codePlaceholder")}
            className="h-11 rounded-xl text-xs font-black bg-background border-border/60 uppercase tracking-wider"
            dir="ltr"
            disabled={isPending}
            aria-invalid={!!errors.code}
          />
          {errors.code && <FieldError id="code-error" errors={[errors.code]} />}
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            control={control}
            name="type"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel htmlFor="type" className="text-xs font-bold">
                  {t("typeLabel")}
                </FieldLabel>
                <Select
                  items={typeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id="type"
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
                {fieldState.error && (
                  <FieldError id="type-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field data-invalid={!!errors.value} className="gap-1.5">
            <FieldLabel htmlFor="value" className="text-xs font-bold">
              {t("valueLabel")}{" "}
              {selectedType === "AMOUNT" && `(${tDiscount("currency")})`}
            </FieldLabel>
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
              className="h-11 py-0 rounded-xl text-xs font-bold bg-background border-border/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.value}
            />
            {errors.value && (
              <FieldError id="value-error" errors={[errors.value]} />
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field data-invalid={!!errors.maxUses} className="gap-1.5">
            <FieldLabel htmlFor="maxUses" className="text-xs font-bold">
              {t("maxUsesLabel")}
            </FieldLabel>
            <Input
              id="maxUses"
              type="number"
              min={1}
              max={10000}
              {...register("maxUses", { valueAsNumber: true })}
              placeholder={t("maxUsesPlaceholder")}
              className="h-11 rounded-xl text-xs font-bold bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.maxUses}
            />
            {errors.maxUses && (
              <FieldError id="maxUses-error" errors={[errors.maxUses]} />
            )}
          </Field>

          <Field data-invalid={!!errors.expiresInDays} className="gap-1.5">
            <FieldLabel htmlFor="expiresInDays" className="text-xs font-bold">
              {t("expiresInDaysLabel")}
            </FieldLabel>
            <Input
              id="expiresInDays"
              type="number"
              min={1}
              max={365}
              {...register("expiresInDays", { valueAsNumber: true })}
              placeholder={t("expiresInDaysPlaceholder")}
              className="h-11 rounded-xl text-xs font-bold bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.expiresInDays}
            />
            {errors.expiresInDays && (
              <FieldError
                id="expiresInDays-error"
                errors={[errors.expiresInDays]}
              />
            )}
          </Field>
        </div>
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
          <span>{t("submitCreate")}</span>
        </Button>
      </div>
    </form>
  );
}
