"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getLoginSchema } from "@/schemas";
import { useAdminLogin } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

export function AdminLoginClient() {
  const t = useTranslations("auth");
  const tAdmin = useTranslations("admin.loginPage");
  const prefersReducedMotion = useReducedMotion();

  const [showPassword, setShowPassword] = useState(false);

  const schema = getLoginSchema(t);
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutate: adminLogin, isPending } = useAdminLogin({
    redirectTo: "/admin",
  });

  const onSubmit = (values: FormValues) => {
    adminLogin(values);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-primary/20">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-accent/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-brand-cyan/20 blur-[80px]" />
      </div>

      <div className="absolute top-4 sm:top-6 inset-x-0 px-4 sm:px-8 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft
            className="h-4 w-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
          <span>{tAdmin("backToUserSite")}</span>
        </Link>

        <div className="flex items-center gap-2 text-white/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary to-brand-accent shadow-lg">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-sm font-black">{tAdmin("brandName")}</span>
        </div>
      </div>

      <motion.div
        initial={
          prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.95 }
        }
        animate={
          prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div
          className="absolute -inset-2 bg-linear-to-r from-primary via-brand-accent to-brand-cyan rounded-3xl blur-2xl opacity-30"
          aria-hidden="true"
        />

        <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-linear-to-r from-primary via-brand-accent to-brand-cyan" />

          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-primary"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-black text-primary uppercase tracking-wider">
                  {tAdmin("portalBadge")}
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <motion.div
                initial={
                  prefersReducedMotion ? undefined : { scale: 0, rotate: -180 }
                }
                animate={
                  prefersReducedMotion ? undefined : { scale: 1, rotate: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary via-primary to-brand-accent shadow-lg shadow-primary/30">
                  <Shield
                    className="h-8 w-8 text-white"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {tAdmin("title")}
              </h1>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {tAdmin("description")}
              </p>
            </div>

            <form
              onSubmit={form?.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <FieldGroup>
                <Controller
                  control={form?.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState?.invalid}>
                      <FieldLabel
                        htmlFor="admin-email"
                        className="text-xs font-bold text-white/80"
                      >
                        {tAdmin("emailLabel")}
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-white/40 pointer-events-none ltr:left-3 ltr:right-auto" />
                        <Input
                          {...field}
                          id="admin-email"
                          type="email"
                          placeholder={tAdmin("emailPlaceholder")}
                          disabled={isPending}
                          aria-invalid={fieldState?.invalid}
                          autoComplete="email"
                          dir="ltr"
                          className={cn(
                            "h-12 rounded-xl text-sm font-bold pr-10 ltr:pl-10 ltr:pr-3",
                            "bg-white/5 border-white/10 text-white placeholder:text-white/30",
                            "focus-visible:ring-primary/50 focus-visible:border-primary/50",
                            "hover:bg-white/10 transition-colors",
                          )}
                        />
                      </div>
                      {fieldState?.invalid && fieldState?.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form?.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState?.invalid}>
                      <FieldLabel
                        htmlFor="admin-password"
                        className="text-xs font-bold text-white/80"
                      >
                        {tAdmin("passwordLabel")}
                      </FieldLabel>
                      <div className="relative">
                        <Lock className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-white/40 pointer-events-none ltr:left-3 ltr:right-auto" />
                        <Input
                          {...field}
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={tAdmin("passwordPlaceholder")}
                          disabled={isPending}
                          aria-invalid={fieldState?.invalid}
                          autoComplete="current-password"
                          className={cn(
                            "h-12 rounded-xl text-sm font-bold pr-10 pl-10",
                            "bg-white/5 border-white/10 text-white placeholder:text-white/30",
                            "focus-visible:ring-primary/50 focus-visible:border-primary/50",
                            "hover:bg-white/10 transition-colors",
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          disabled={isPending}
                          className="absolute top-1/2 -translate-y-1/2 left-3 ltr:right-3 ltr:left-auto text-white/40 hover:text-white transition-colors cursor-pointer p-1"
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
                      {fieldState?.invalid && fieldState?.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                disabled={isPending}
                className={cn(
                  "w-full h-12 text-sm font-black rounded-xl mt-2 cursor-pointer gap-2",
                  "bg-linear-to-r from-primary via-primary to-brand-accent",
                  "hover:opacity-90 hover:shadow-2xl hover:shadow-primary/40",
                  "text-white shadow-lg shadow-primary/25",
                  "transition-all active:scale-[0.98]",
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{tAdmin("submitting")}</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    <span>{tAdmin("submitButton")}</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="border-t border-white/5 bg-white/5 px-6 sm:px-8 py-4">
            <div className="flex items-start gap-2 text-[10px] text-white/50 leading-relaxed">
              <Shield
                className="h-3 w-3 shrink-0 mt-0.5 text-amber-400"
                aria-hidden="true"
              />
              <span>{tAdmin("securityNote")}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
