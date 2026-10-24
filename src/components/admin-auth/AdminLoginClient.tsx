"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getAdminLoginSchema, type AdminLoginInput } from "@/schemas";
import { useAdminLogin } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function AdminLoginClient() {
  const t = useTranslations("admin.loginPage");
  const tAuth = useTranslations("auth");
  const { mutate: adminLogin, isPending } = useAdminLogin({
    redirectTo: "/admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentYear, setCurrentYear] = useState<string>("2025");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const adminLoginSchema = getAdminLoginSchema(tAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "test@learnino.com",
      password: "123456",
    },
  });

  const onSubmit = (data: AdminLoginInput) => {
    adminLogin(data);
  };

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        "flex items-center justify-center p-4 sm:p-6 lg:p-8",
        "bg-linear-to-br from-background via-background to-primary/5",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -inset-e-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -inset-s-40 h-96 w-96 rounded-full bg-brand-accent/20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 inset-s-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-primary/5 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                            linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 mb-6 group",
            "text-xs font-bold text-muted-foreground hover:text-primary",
            "transition-colors duration-200",
          )}
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
          <span>{t("backToUserSite")}</span>
        </Link>

        <Card
          className={cn(
            "relative border-border/60 shadow-2xl shadow-primary/10",
            "bg-card/80 backdrop-blur-xl",
            "overflow-hidden",
          )}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-brand-accent to-primary" />

          <div className="absolute top-4 inset-e-4 opacity-20">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>

          <CardHeader className="space-y-4 pt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />

                <div
                  className={cn(
                    "relative flex h-20 w-20 items-center justify-center",
                    "rounded-3xl bg-linear-to-br from-primary to-brand-accent",
                    "shadow-xl shadow-primary/30 ring-4 ring-background",
                    "p-3",
                  )}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/logo/Main-Logo.png"
                      alt="Learnino Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute -bottom-1 -inset-e-1",
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    "bg-emerald-500 border-4 border-background shadow-lg",
                  )}
                >
                  <ShieldCheck className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <h1 className="text-2xl font-black text-foreground tracking-tight">
                  {t("brandName")}
                </h1>
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
                    "bg-primary/10 border border-primary/20",
                    "text-xs font-black text-primary uppercase tracking-widest",
                  )}
                >
                  <ShieldCheck className="h-3 w-3" />
                  <span>{t("portalBadge")}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold text-foreground flex items-center gap-1.5"
                >
                  <Mail className="h-3 w-3 text-primary" />
                  {t("emailLabel")}
                </Label>
                <div className="relative group">
                  <div
                    className={cn(
                      "absolute inset-s-3 top-1/2 -translate-y-1/2 z-10",
                      "text-muted-foreground group-focus-within:text-primary",
                      "transition-colors duration-200",
                    )}
                  >
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    dir="ltr"
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    disabled={isPending}
                    {...register("email")}
                    className={cn(
                      "h-11 ps-10 pe-3 rounded-xl",
                      "bg-background/50 border-border/60",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "text-sm font-medium",
                      "transition-all duration-200",
                      errors.email &&
                        "border-destructive focus:ring-destructive/20",
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-bold text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-foreground flex items-center gap-1.5"
                >
                  <Lock className="h-3 w-3 text-primary" />
                  {t("passwordLabel")}
                </Label>
                <div className="relative group">
                  <div
                    className={cn(
                      "absolute inset-s-3 top-1/2 -translate-y-1/2 z-10",
                      "text-muted-foreground group-focus-within:text-primary",
                      "transition-colors duration-200",
                    )}
                  >
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="current-password"
                    disabled={isPending}
                    {...register("password")}
                    className={cn(
                      "h-11 ps-10 pe-10 rounded-xl",
                      "bg-background/50 border-border/60",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "text-sm font-medium",
                      "transition-all duration-200",
                      errors.password &&
                        "border-destructive focus:ring-destructive/20",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? t("hidePassword") : t("showPassword")
                    }
                    className={cn(
                      "absolute inset-e-3 top-1/2 -translate-y-1/2 z-10",
                      "text-muted-foreground hover:text-primary",
                      "transition-colors duration-200 cursor-pointer",
                    )}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-bold text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className={cn(
                  "w-full h-12 rounded-xl text-sm font-black cursor-pointer",
                  "bg-linear-to-r from-primary to-brand-accent ",
                  "hover:shadow-lg hover:shadow-primary/30",
                  "text-primary-foreground",
                  "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:opacity-70 disabled:hover:scale-100",
                )}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t("submitting")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t("submitButton")}</span>
                  </div>
                )}
              </Button>
            </form>

            <div
              className={cn(
                "relative p-3 rounded-xl overflow-hidden",
                "bg-amber-500/5 dark:bg-amber-500/10",
                "border border-amber-500/20",
              )}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200/90 font-medium">
                  {t("securityNote")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">
          <div className="h-px w-8 bg-linear-to-r from-transparent to-border" />
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Learnino © {currentYear}</span>
          <Sparkles className="h-3 w-3 text-primary" />
          <div className="h-px w-8 bg-linear-to-l from-transparent to-border" />
        </div>
      </div>
    </div>
  );
}
