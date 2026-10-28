"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import type { UserProfile } from "@/types";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RefObject } from "react";
import { Controller, type Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import type { ProfileFormValues } from "../hooks/useProfileForm";

interface ProfileAvatarFieldProps {
  control: Control<ProfileFormValues>;
  profile: UserProfile;
  displayAvatar: string | null | undefined;
  previewUrl: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isDeleting: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSelection: () => void;
  onDeleteAvatar: () => void;
}

export function ProfileAvatarField({
  control,
  profile,
  displayAvatar,
  previewUrl,
  fileInputRef,
  isDeleting,
  onAvatarChange,
  onDeleteAvatar,
}: ProfileAvatarFieldProps) {
  const t = useTranslations("dashboard");

  const initial = (profile?.name || profile?.email || "?")
    .charAt(0)
    ?.toUpperCase();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Camera className="h-4 w-4 text-brand-accent" aria-hidden="true" />
        <h3 className="text-sm font-black text-foreground">
          {t("avatarSection")}
        </h3>
      </div>

      <Controller
        name="avatar"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState?.invalid}>
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-md border border-dashed border-border/60 bg-muted/20">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 border-background bg-muted shadow-md">
                {displayAvatar ? (
                  <Image
                    src={displayAvatar}
                    alt="avatar preview"
                    fill
                    quality={90}
                    sizes="84px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-primary/10 text-primary font-black text-xl">
                    {initial}
                  </div>
                )}
              </div>

              <FieldContent>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-xs font-black transition-colors">
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t("uploadNew")}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={onAvatarChange}
                      className="hidden"
                    />
                  </label>

                  {profile?.avatar && !previewUrl && (
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={onDeleteAvatar}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1 px-3 h-9 text-xs font-black cursor-pointer disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span>{t("removeAvatarBtn")}</span>
                    </Button>
                  )}
                </div>

                <FieldDescription>{t("avatarHint")}</FieldDescription>

                {fieldState?.invalid && fieldState?.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </div>
          </Field>
        )}
      />
    </div>
  );
}
