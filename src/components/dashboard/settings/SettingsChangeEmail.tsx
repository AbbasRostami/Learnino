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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  getRequestChangeEmailSchema,
  getVerifyChangeEmailSchema,
} from "@/schemas";
import {
  useProfile,
  useRequestChangeEmail,
  useResendChangeEmailCode,
  useVerifyChangeEmail,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtSign,
  Loader2,
  Mail,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { PasswordField } from "./shared/PasswordField";

type Step = "request" | "verify";
type OtpStatus = "idle" | "error" | "success";

export function SettingsChangeEmail() {
  const t = useTranslations("auth");
  const tDashboard = useTranslations("dashboard");

  const { data: profileData } = useProfile();
  const currentEmail = profileData?.data?.profile?.email;

  const [step, setStep] = useState<Step>("request");
  const [pendingEmail, setPendingEmail] = useState("");
  const [timer, setTimer] = useState(120);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");

  const requestSchema = getRequestChangeEmailSchema(t);
  type RequestFormValues = z.infer<typeof requestSchema>;

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { newEmail: "", password: "" },
    mode: "onChange",
  });

  const { mutate: requestChange, isPending: isRequesting } =
    useRequestChangeEmail({
      onSuccessCallback: (emailFromApi) => {
        if (emailFromApi) setPendingEmail(emailFromApi);
        setStep("verify");
        setTimer(120);
        setOtpStatus("idle");
        requestForm?.reset();
      },
    });

  const verifySchema = getVerifyChangeEmailSchema(t);
  type VerifyFormValues = z.infer<typeof verifySchema>;

  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const { mutate: verifyChange, isPending: isVerifying } = useVerifyChangeEmail(
    {
      onSuccessCallback: () => {
        setOtpStatus("success");
      },
      onErrorCallback: (error) => {
        setOtpStatus("error");
        verifyForm?.setError("code", {
          type: "manual",
          message: error?.message || t("errorGeneral"),
        });

        if (
          error?.message?.includes("expired") ||
          error?.message?.includes("request")
        ) {
          setTimeout(() => {
            handleCancel();
          }, 1500);
        } else {
          setTimeout(() => {
            verifyForm?.setValue("code", "");
            setOtpStatus("idle");
          }, 600);
        }
      },
    },
  );

  const { mutate: resendCode, isPending: isResending } =
    useResendChangeEmailCode();

  useEffect(() => {
    if (step !== "verify" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec?.toString()?.padStart(2, "0")}`;
  };

  const onSubmitRequest = (values: RequestFormValues) => {
    if (values?.newEmail === currentEmail) {
      toast.error(tDashboard("sameAsCurrentEmail"));
      return;
    }
    setPendingEmail(values.newEmail);
    requestChange(values);
  };

  const onSubmitVerify = (values: VerifyFormValues) => {
    setOtpStatus("idle");
    verifyChange(values);
  };

  const handleCancel = () => {
    setStep("request");
    setPendingEmail("");
    setTimer(120);
    setOtpStatus("idle");
    verifyForm?.reset();
    requestForm?.reset();
  };

  const handleResend = () => {
    if (timer > 0) {
      resendCode(undefined, {
        onSuccess: () => {
          setTimer(120);
          verifyForm?.setValue("code", "");
          verifyForm?.clearErrors("code");
          setOtpStatus("idle");
        },
      });
    } else {
      toast.info("کد منقضی شده است. لطفاً مجدداً درخواست دهید.");
      handleCancel();
    }
  };

  const slotBaseClass = cn(
    "w-11 h-12 text-lg font-black transition-colors border rounded-xl",
    otpStatus === "error" &&
      "!border-destructive text-destructive bg-destructive/5",
    otpStatus === "success" &&
      "!border-emerald-500 text-emerald-600 bg-emerald-500/10 dark:!border-emerald-400 dark:text-emerald-400 dark:bg-emerald-400/10",
    otpStatus === "idle" && "border-border",
  );

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
          <AtSign className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2 className="text-sm font-black text-foreground">
          {t("changeEmail")}
        </h2>
      </div>

      {currentEmail && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border/40 mb-6 max-w-md">
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold">
              {tDashboard("currentEmailLabel")}
            </span>
            <span
              className="text-xs font-bold text-foreground truncate"
              dir="ltr"
            >
              {currentEmail}
            </span>
          </div>
        </div>
      )}

      {step === "request" && (
        <>
          <p className="text-[11px] text-muted-foreground mb-6 leading-relaxed">
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
                    <FieldLabel
                      htmlFor="newEmail"
                      className="text-xs font-bold"
                    >
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
                <ArrowRight
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                />
              )}
              <span>{t("submitChangeEmail")}</span>
            </Button>
          </form>
        </>
      )}

      {step === "verify" && (
        <>
          <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-md">
            <p className="text-[11px] text-foreground leading-relaxed">
              {t("verifyChangeEmailDescription", { email: "" })}{" "}
              <span className="font-black text-primary inline-block" dir="ltr">
                {pendingEmail}
              </span>
            </p>
          </div>

          <form
            onSubmit={verifyForm?.handleSubmit(onSubmitVerify)}
            className="flex flex-col gap-5 max-w-md"
            noValidate
          >
            <FieldGroup>
              <Controller
                name="code"
                control={verifyForm?.control}
                render={({ field, fieldState }) => {
                  const isInvalid =
                    fieldState?.invalid || otpStatus === "error";

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-xs font-bold text-center mb-2">
                        {tDashboard("otpCodeLabel")}
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
                          value={field?.value}
                          disabled={isVerifying || otpStatus === "success"}
                          onChange={(value) => {
                            field?.onChange(value);
                            if (verifyForm?.formState?.errors?.code) {
                              verifyForm?.clearErrors("code");
                            }
                            if (otpStatus !== "idle") {
                              setOtpStatus("idle");
                            }

                            if (value?.length === 6 && !isVerifying) {
                              verifyForm?.handleSubmit(onSubmitVerify)();
                            }
                          }}
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/[^0-9]/g, "");
                          }}
                        >
                          <InputOTPGroup className="gap-2">
                            {[0, 1, 2, 3, 4, 5]?.map((index) => (
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

                      {isInvalid && fieldState?.error && (
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
            </FieldGroup>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={isVerifying || otpStatus === "success"}
                className="w-full h-11 text-xs font-black rounded-xl cursor-pointer bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-md shadow-primary/20"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin ms-2" />
                    <span>{t("verifying")}</span>
                  </>
                ) : (
                  <span>{t("submitVerifyChangeEmail")}</span>
                )}
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                {timer > 0 ? (
                  <span className="font-mono text-xs font-semibold">
                    {t("resendCodeIn", { time: formatTime(timer) })}
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                    کد منقضی شد
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0 || isResending || isVerifying}
                  className={cn(
                    "font-bold text-xs inline-flex items-center gap-1 transition-all",
                    timer > 0 || isResending || isVerifying
                      ? "opacity-40 cursor-not-allowed text-muted-foreground pointer-events-none"
                      : "text-primary hover:underline cursor-pointer",
                  )}
                >
                  {isResending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : timer > 0 ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>{t("resendCode")}</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>درخواست مجدد کد</span>
                    </>
                  )}
                </button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isVerifying}
                className="text-xs text-muted-foreground hover:text-destructive rounded-xl self-start cursor-pointer mt-1"
              >
                {t("cancelChangeEmail")}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
