"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthStore } from "@/hooks/authStore";
import { getVerifyEmailSchema } from "@/schemas/auth/auth.schema";
import { useVerifyEmail } from "@/services/auth/useVerifyEmail";

type FormValues = z.infer<ReturnType<typeof getVerifyEmailSchema>>;

interface Props {
  email: string;
  onBack: () => void;
}

export default function VerifyOtpForm({ email, onBack }: Props) {
  const t = useTranslations("auth");

  // 🎯 ایجاد اسکیمای ترجمه شده بر اساس زبان فعلی فعال در هوک
  const schema = getVerifyEmailSchema(t);

  const router = useRouter();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const [timer, setTimer] = useState(120);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema), // 👈 استفاده از اسکیمای دوزبانه
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
    verifyEmail(values, {
      onSuccess: (response) => {
        toast.success(response.data.message || "Success!");
        setAuthenticated(true);
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error.message || "Error");
      },
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {t("verifyEmailTitle")}
        </CardTitle>
        <CardDescription>
          {/* تزریق ایمیل پویا در داخل متن ترجمه */}
          {t.rich("verifyEmailDescription", {
            email: () => (
              <span className="font-semibold text-foreground" dir="ltr">
                {email}
              </span>
            ),
          })}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="verify-form"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-center" dir="ltr">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {fieldState.invalid && (
                    <div className="flex justify-center">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              form="verify-form"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  {t("verifying")}
                </>
              ) : (
                t("submitVerify")
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {timer > 0 ? (
                <p>
                  {/* نمایش زمان پویا درون ترجمه معکوس */}
                  {t("resendCodeIn", { time: formatTime(timer) })}
                </p>
              ) : (
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    setTimer(120);
                    toast.info(t("otpResentSuccess"));
                  }}
                >
                  {t("resendCode")}
                </button>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isPending}
          className="mx-auto"
        >
          <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />{" "}
          {/* چرخش فلش در حالت RTL */}
          {t("changeEmail")}
        </Button>
      </CardFooter>
    </Card>
  );
}
