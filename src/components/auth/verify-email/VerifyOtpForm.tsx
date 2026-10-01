"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthCard } from "@/components/auth/shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { getVerifyEmailSchema } from "@/schemas";
import { useResendVerification, useVerifyEmail } from "@/services";

type FormValues = z.infer<ReturnType<typeof getVerifyEmailSchema>>;
type OtpStatus = "idle" | "error" | "success";

interface Props {
  email: string;
  onBack?: () => void;
}

export default function VerifyOtpForm({ email, onBack }: Props) {
  const t = useTranslations("auth");

  const schema = getVerifyEmailSchema(t);
  const { mutate: verifyEmail, isPending } = useVerifyEmail({
    redirectTo: "/",
  });
  const { mutate: resendCode, isPending: isResending } =
    useResendVerification();

  const [timer, setTimer] = useState(120);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      code: "",
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

    verifyEmail(values, {
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
    resendCode(
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
      title={t("verifyEmailTitle")}
      description={t.rich("verifyEmailDescription", {
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
      <form id="verify-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="space-y-6">
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => {
              const isInvalid = fieldState.invalid || otpStatus === "error";

              return (
                <Field data-invalid={isInvalid}>
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
                      data-testid="otp-input"
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

                        if (value.length === 6 && !isPending) {
                          form.handleSubmit(onSubmit)();
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

          <Button
            type="submit"
            data-testid="otp-submit-btn"
            form="verify-form"
            className="w-full h-11 text-base font-semibold cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all active:scale-[0.99]"
            disabled={isPending || otpStatus === "success"}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                {t("verifying")}
              </>
            ) : otpStatus === "success" ? (
              t("submitVerify")
            ) : (
              t("submitVerify")
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
              className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors pt-2 disabled:opacity-50"
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
