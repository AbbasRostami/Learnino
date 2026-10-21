"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  autoComplete?: string;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  autoComplete = "current-password",
}: PasswordFieldProps<T>) {
  const t = useTranslations("dashboard");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState?.invalid}>
          <FieldLabel htmlFor={name} className="text-xs font-bold">
            {label}
          </FieldLabel>
          <div className="relative">
            <KeyRound className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground pointer-events-none ltr:left-3 ltr:right-auto" />
            <Input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              aria-invalid={fieldState?.invalid}
              className="h-11 rounded-xl text-xs font-bold pr-10 ltr:pl-10 ltr:pr-3"
              autoComplete={autoComplete}
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute top-1/2 -translate-y-1/2 left-3 ltr:right-3 ltr:left-auto cursor-pointer p-1"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {fieldState?.invalid && fieldState?.error && (
            <FieldError errors={[fieldState?.error]} />
          )}
        </Field>
      )}
    />
  );
}
