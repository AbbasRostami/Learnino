"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { getResetPasswordSchema } from "@/schemas";
import { useResendResetCode, useResetPassword } from "@/services";

type FormValues = z.infer<ReturnType<typeof getResetPasswordSchema>>;
type OtpStatus = "idle" | "error" | "success";

interface Props {
  email: string;
  onBack?: () => void;
}

export default function ResetPasswordForm({ email, onBack }: Props) {
  const t = useTranslations("auth");
  const schema = getResetPasswordSchema(t);

  const { mutate: resetPassword, isPending } = useResetPassword();
  const { mutate: resendResetCode, isPending: isResending } =
    useResendResetCode();

  const [timer, setTimer] = useState(120);
  const [showPassword, setShowPassword] = useState(false);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      code: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const onSubmit = (values: FormValues) => {
    setOtpStatus("idle");

    resetPassword(values, {
      onSuccess: () => {
        setOtpStatus("success");
      },
      onError: (error) => {
        setOtpStatus("error");
        form.setError("code", {
          type: "manual",
          message: error.message || t("errorGeneral"),
        });

        setTimeout(() => {
          form.setValue("code", "");
          setOtpStatus("idle");
        }, 600);
      },
    });
  };

  const handleResend = () => {
    resendResetCode(
      { email },
      {
        onSuccess: () => {
          setTimer(120);
          form.setValue("code", "");
          form.clearErrors("code");
          setOtpStatus("idle");
        },
      },
    );
  };

  const slotBaseClass = cn(
    "w-11 h-12 text-lg transition-colors border rounded-xl",
    otpStatus === "error" &&
      "!border-destructive text-destructive bg-destructive/5",
    otpStatus === "success" &&
      "!border-emerald-500 text-emerald-600 bg-emerald-500/10 dark:!border-emerald-400 dark:text-emerald-400 dark:bg-emerald-400/10",
    otpStatus === "idle" && "border-border",
  );

  return (
    <AuthCard
      title={t("resetPasswordTitle")}
      description={t.rich("resetPasswordDescription", {
        email: () => (
          <span
            className="font-semibold text-foreground inline-block"
            dir="ltr"
          >
            {email}
          </span>
        ),
      })}
    >
      <form
        id="reset-password-form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldGroup className="space-y-5">
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => {
              const isInvalid = fieldState.invalid || otpStatus === "error";

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-center block mb-2">
                    {t("verifyEmailTitle")}
                  </FieldLabel>
                  <motion.div
                    className="flex justify-center"
                    dir="ltr"
                    animate={
                      otpStatus === "error"
                        ? {
                            x: [0, -10, 10, -8, 8, -4, 4, 0],
                            transition: { duration: 0.5 },
                          }
                        : otpStatus === "success"
                          ? {
                              scale: [1, 1.04, 1],
                              transition: { duration: 0.35 },
                            }
                          : { x: 0, scale: 1 }
                    }
                  >
                    <InputOTP
                      dir="ltr"
                      maxLength={6}
                      value={field.value}
                      disabled={isPending || otpStatus === "success"}
                      onChange={(value) => {
                        field.onChange(value);
                        if (form.formState.errors.code) {
                          form.clearErrors("code");
                        }
                        if (otpStatus !== "idle") {
                          setOtpStatus("idle");
                        }
                      }}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                      }}
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={cn(
                              slotBaseClass,
                              index === 0 && "first:rounded-xl!",
                              index === 5 && "last:rounded-xl!",
                            )}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </motion.div>

                  {isInvalid && fieldState.error && (
                    <motion.div
                      className="flex justify-center mt-2"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FieldError errors={[fieldState.error]} />
                    </motion.div>
                  )}
                </Field>
              );
            }}
          />

          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-password">
                  {t("newPassword")}
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute top-3 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
                  <Input
                    {...field}
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("newPasswordPlaceholder")}
                    className="h-11 rounded-xl pr-10 pl-10 ltr:pl-10 ltr:pr-10"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
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
            form="reset-password-form"
            className="w-full h-11 text-base font-semibold cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.99]"
            disabled={isPending || otpStatus === "success"}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                {t("verifying")}
              </>
            ) : (
              t("submitResetPassword")
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {timer > 0 ? (
              <p>{t("resendCodeIn", { time: formatTime(timer) })}</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || isPending}
                className="text-primary hover:underline font-semibold disabled:opacity-50 cursor-pointer transition-colors"
              >
                {isResending ? t("sending") : t("resendCode")}
              </button>
            )}
          </div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isPending || otpStatus === "success"}
              className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors pt-1 disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform rtl:rotate-180" />
              <span>{t("changeEmail")}</span>
            </button>
          )}
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
