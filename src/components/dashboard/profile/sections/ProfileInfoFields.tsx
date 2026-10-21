"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import type { UserProfile } from "@/types";
import { AtSign, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, type Control } from "react-hook-form";

import type { ProfileFormValues } from "../hooks/useProfileForm";

interface ProfileInfoFieldsProps {
  control: Control<ProfileFormValues>;
  profile: UserProfile;
}

export function ProfileInfoFields({
  control,
  profile,
}: ProfileInfoFieldsProps) {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-sm font-black text-foreground">
          {t("personalInfo")}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState?.invalid}>
              <FieldLabel htmlFor="profile-name">{t("nameLabel")}</FieldLabel>
              <div className="relative">
                <User className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground pointer-events-none ltr:left-3 ltr:right-auto" />
                <Input
                  {...field}
                  id="profile-name"
                  aria-invalid={fieldState?.invalid}
                  placeholder={t("namePlaceholder")}
                  className="h-11 rounded-md text-xs font-bold pr-10 ltr:pl-10 ltr:pr-3"
                />
              </div>
              {fieldState?.invalid && fieldState?.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState?.invalid}>
              <FieldLabel htmlFor="profile-phone">{t("phoneLabel")}</FieldLabel>
              <div className="relative">
                <Phone className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground pointer-events-none ltr:left-3 ltr:right-auto" />
                <Input
                  {...field}
                  id="profile-phone"
                  aria-invalid={fieldState?.invalid}
                  placeholder={t("phonePlaceholder")}
                  className="h-11 rounded-md text-xs font-bold pr-10 ltr:pl-10 ltr:pr-3"
                  dir="ltr"
                  maxLength={11}
                  autoComplete="tel"
                />
              </div>
              {fieldState?.invalid && fieldState?.error && (
                <FieldError errors={[fieldState?.error]} />
              )}
            </Field>
          )}
        />
      </div>

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="profile-email" className="text-muted-foreground">
            {t("emailLabel")}
          </FieldLabel>
          <Link
            href="/dashboard/settings"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>{t("changeEmailLink")}</span>
          </Link>
        </div>
        <div className="relative">
          <AtSign className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground pointer-events-none ltr:left-3 ltr:right-auto" />
          <Input
            id="profile-email"
            value={profile?.email || ""}
            disabled
            className="h-11 rounded-md text-xs font-bold bg-muted/40 opacity-70 cursor-not-allowed pr-10 ltr:pl-10 ltr:pr-3"
            dir="ltr"
          />
        </div>
      </Field>
    </div>
  );
}
