"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { getChangePasswordSchema } from "@/schemas";
import { useChangePassword } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { PasswordField } from "./shared/PasswordField";

export function SettingsChangePassword() {
  const t = useTranslations("auth");
  const tDashboard = useTranslations("dashboard");

  const schema = getChangePasswordSchema(t);
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const { mutate: changePassword, isPending } = useChangePassword({
    onSuccessCallback: () => form?.reset(),
  });

  const onSubmit = (values: FormValues) => {
    changePassword(values);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
          <Shield className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2 className="text-sm font-black text-foreground">
          {t("changePassword")}
        </h2>
      </div>
      <p className="text-[11px] text-muted-foreground mb-6 leading-relaxed">
        {t("changePasswordDescription")}
      </p>

      <form
        onSubmit={form?.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md"
      >
        <FieldGroup>
          <PasswordField
            control={form?.control}
            name="currentPassword"
            label={t("currentPassword")}
            autoComplete="current-password"
          />

          <div className="flex flex-col gap-1.5">
            <PasswordField
              control={form?.control}
              name="newPassword"
              label={t("newPassword")}
              autoComplete="new-password"
            />
            <p className="text-[10px] text-muted-foreground">
              {tDashboard("passwordHint")}
            </p>
          </div>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isPending}
          className="rounded-xl h-11 text-xs font-black gap-2 self-start cursor-pointer shadow-md mt-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          <span>{t("submitChangePassword")}</span>
        </Button>
      </form>
    </div>
  );
}
