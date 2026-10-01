"use client";

import { Link } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail, User } from "lucide-react";
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
import { getRegisterSchema } from "@/schemas";
import { useRegister } from "@/services";

type FormValues = z.infer<ReturnType<typeof getRegisterSchema>>;

interface Props {
  onSuccess?: (email: string) => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const t = useTranslations("auth");
  const schema = getRegisterSchema(t);

  const { mutate: registerUser, isPending } = useRegister({
    onSuccessCallback: (email) => {
      onSuccess?.(email);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    registerUser(values);
  };

  return (
    <AuthCard
      title={t("registerTitle")}
      footer={
        <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <span>{t("hasAccount")}</span>
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline transition-colors"
          >
            {t("login")}
          </Link>
        </p>
      }
    >
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldGroup className="gap-3">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-name">{t("name")}</FieldLabel>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="register-name"
                    data-testid="name-input"
                    placeholder={t("namePlaceholder")}
                    className="rtl:pr-10 ltr:pl-10 h-11 rounded-xl"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-email">{t("email")}</FieldLabel>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="register-email"
                    data-testid="email-input"
                    type="email"
                    placeholder="example@email.com"
                    dir="ltr"
                    className="rtl:pr-10 ltr:pl-10 text-left h-11 rounded-xl"
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

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-password">
                  {t("password")}
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="register-password"
                    data-testid="password-input"
                    type="password"
                    placeholder="••••••••"
                    className="rtl:pr-10 ltr:pl-10 h-11 rounded-xl"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
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
            data-testid="register-submit-btn"
            form="register-form"
            className="w-full h-11 text-base font-semibold cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.99]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("submitRegister")
            )}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
