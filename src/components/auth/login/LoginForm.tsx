"use client";

import { Link } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
import { getLoginSchema } from "@/schemas";
import { useLogin } from "@/services";

type FormValues = z.infer<ReturnType<typeof getLoginSchema>>;

export default function LoginForm() {
  const t = useTranslations("auth");
  const schema = getLoginSchema(t);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: loginUser, isPending } = useLogin({
    redirectTo: "/",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    loginUser(values, {
      onError: (error) => {
        form.setError("password", {
          type: "manual",
          message: error.message || t("errorGeneral"),
        });
      },
    });
  };

  return (
    <AuthCard
      title={t("loginTitle")}
      description={t("loginDescription")}
      footer={
        <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <span>{t("noAccount")}</span>
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline transition-colors"
          >
            {t("register")}
          </Link>
        </p>
      }
    >
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">{t("email")}</FieldLabel>
                <div className="relative">
                  <Mail className="absolute top-3 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="login-email"
                    data-testid="email-input"
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

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor="login-password">
                    {t("password")}
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline transition-colors"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute top-3 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="login-password"
                    data-testid="password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl pr-10 pl-10 ltr:pl-10 ltr:pr-10"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isPending}
                    className="absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer left-3 ltr:left-auto ltr:right-3"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="login-form"
            data-testid="login-submit-btn"
            className="w-full h-11 text-base font-semibold cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.99]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("submitLogin")
            )}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
