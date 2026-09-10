"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getRegisterSchema } from "@/schemas/auth/auth.schema"; // 👈 تغییر ایمپورت به getRegisterSchema
import { useRegister } from "@/services/auth/useRegister";

// 🎯 استخراج داینامیک تایپ فرم بر اساس تابع اسکیما
type FormValues = z.infer<ReturnType<typeof getRegisterSchema>>;

interface Props {
  onSuccess: (email: string) => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const t = useTranslations("auth"); // برای متن‌های UI و دکمه‌ها
  
  // 🎯 ارسال تابع ترجمه به اسکیما برای دوزبانه کردن خطاهای Zod
  const schema = getRegisterSchema(t); 

  const { mutate: registerUser, isPending } = useRegister();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema), // 👈 نسبت دادن اسکیمای ترجمه شده
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    registerUser(values, {
      onSuccess: (response) => {
        toast.success(response.data.message);
        onSuccess(response.data.email);
      },
      onError: (error: any) => {
        toast.error(error.message || "Error");
      },
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">
          {t("registerTitle")} {/* 👈 داینامیک */}
        </CardTitle>
        <CardDescription>{t("registerDescription")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup>
            {/* Name */}
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-name">{t("name")}</FieldLabel>
                  <div className="relative">
                    <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      id="register-name"
                      placeholder={t("namePlaceholder")}
                      className="pr-10"
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

            {/* Email */}
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">{t("email")}</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      dir="ltr"
                      className="pr-10 text-left"
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

            {/* Password */}
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">
                    {t("password")}
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pr-10"
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                  </div>
                  <FieldDescription>
                    {t("passwordDescription")}
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              form="register-form"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  {t("sending")}
                </>
              ) : (
                t("submitRegister")
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link href="/login" className="text-primary hover:underline">
            {t("login")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
