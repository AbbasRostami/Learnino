"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Loader2, RefreshCw, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { Controller, UseFormReturn } from "react-hook-form";
import type { OtpStatus } from "../hooks/useChangeEmailForm";

interface ChangeEmailVerifyStepProps {
  pendingEmail: string;
  verifyForm: UseFormReturn<{ code: string }>;
  onSubmitVerify: (values: { code: string }) => void;
  isVerifying: boolean;
  otpStatus: OtpStatus;
  setOtpStatus: (status: OtpStatus) => void;
  timer: number;
  formatTime: (s: number) => string;
  isResending: boolean;
  handleResend: () => void;
  handleCancel: () => void;
  t: (key: string, values?: Record<string, string>) => string;
  tDashboard: (key: string) => string;
}

export function ChangeEmailVerifyStep({
  pendingEmail,
  verifyForm,
  onSubmitVerify,
  isVerifying,
  otpStatus,
  setOtpStatus,
  timer,
  formatTime,
  isResending,
  handleResend,
  handleCancel,
  t,
  tDashboard,
}: ChangeEmailVerifyStepProps) {
  const slotBaseClass = cn(
    "w-11 h-12 text-lg font-black transition-colors border rounded-xl",
    otpStatus === "error" &&
      "!border-destructive text-destructive bg-destructive/5",
    otpStatus === "success" &&
      "!border-emerald-500 text-emerald-600 bg-emerald-500/10 dark:!border-emerald-400 dark:text-emerald-400 dark:bg-emerald-400/10",
    otpStatus === "idle" && "border-border",
  );

  return (
    <>
      <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-md">
        <p className="text-xs text-foreground leading-relaxed">
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
              const isInvalid = fieldState?.invalid || otpStatus === "error";

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
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          "",
                        );
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
              <span className="text-xs font-semibold">
                {t("resendCodeIn", { time: formatTime(timer) })}
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">
                {t("codeExpired")}
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
                  <span>{t("resendCode")}</span>
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
  );
}
