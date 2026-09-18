"use client";

import { Link } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthCard } from "@/components/auth/shared/AuthCard";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getForgotPasswordSchema } from "@/schemas";
import { useForgotPassword } from "@/services";

type FormValues = z.infer<ReturnType<typeof getForgotPasswordSchema>>;

interface Props {
  onSuccess?: (email: string) => void;
}

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const t = useTranslations("auth");
  const schema = getForgotPasswordSchema(t);

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    onSuccessCallback: (email) => {
      onSuccess?.(email);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    forgotPassword(values);
  };

  return (
    <AuthCard
      title={t("forgotPasswordTitle")}
      description={t("forgotPasswordDescription")}
      footer={
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform rtl:rotate-180" />
          <span>{t("backToLogin")}</span>
        </Link>
      }
    >
      <form
        id="forgot-password-form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldGroup className="gap-4">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-email">{t("email")}</FieldLabel>
                <div className="relative">
                  <Mail className="absolute top-3 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="forgot-email"
                    type="email"
                    placeholder="example@email.com"
                    dir="ltr"
                    className="h-11 rounded-xl text-left pr-10 ltr:pl-10 ltr:pr-3"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="forgot-password-form"
            className="w-full h-11 text-base font-semibold cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.99]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("submitForgotPassword")
            )}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
