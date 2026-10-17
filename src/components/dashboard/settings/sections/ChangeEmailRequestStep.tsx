"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, AtSign, Loader2 } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { PasswordField } from "../shared/PasswordField";

interface ChangeEmailRequestStepProps {
  requestForm: UseFormReturn<{ newEmail: string; password: string }>;
  onSubmitRequest: (values: { newEmail: string; password: string }) => void;
  isRequesting: boolean;
  t: (key: string) => string;
}

export function ChangeEmailRequestStep({
  requestForm,
  onSubmitRequest,
  isRequesting,
  t,
}: ChangeEmailRequestStepProps) {
  return (
    <>
      <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
        {t("changeEmailDescription")}
      </p>

      <form
        onSubmit={requestForm?.handleSubmit(onSubmitRequest)}
        className="flex flex-col gap-4 max-w-md"
        noValidate
      >
        <FieldGroup>
          <Controller
            name="newEmail"
            control={requestForm?.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState?.invalid}>
                <FieldLabel htmlFor="newEmail" className="text-xs font-bold">
                  {t("newEmail")}
                </FieldLabel>
                <div className="relative">
                  <AtSign className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground pointer-events-none ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="newEmail"
                    type="email"
                    aria-invalid={fieldState?.invalid}
                    placeholder={t("newEmailPlaceholder")}
                    className="h-11 rounded-xl text-xs font-bold pr-10 ltr:pl-10 ltr:pr-3"
                    autoComplete="email"
                    dir="ltr"
                    disabled={isRequesting}
                  />
                </div>
                {fieldState?.invalid && fieldState?.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <PasswordField
            control={requestForm?.control}
            name="password"
            label={t("currentPassword")}
            autoComplete="current-password"
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={isRequesting}
          className="rounded-xl h-11 text-xs font-black gap-2 self-start cursor-pointer shadow-md mt-2 bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-primary/20"
        >
          {isRequesting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          )}
          <span>{t("submitChangeEmail")}</span>
        </Button>
      </form>
    </>
  );
}
