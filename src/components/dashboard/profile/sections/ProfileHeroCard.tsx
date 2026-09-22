"use client";

import { useLocale } from "@/hooks/useLocale";
import type { UserProfile } from "@/types";
import { BadgeCheck, Calendar, Camera } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

interface ProfileHeroCardProps {
  profile: UserProfile;
  displayAvatar: string | null | undefined;
}

export function ProfileHeroCard({
  profile,
  displayAvatar,
}: ProfileHeroCardProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const memberSinceDate = profile?.createdAt
    ? new Date(profile.createdAt)?.toLocaleDateString(
        locale === "fa" ? "fa-IR" : "en-US",
        { year: "numeric", month: "long" },
      )
    : "—";

  const displayName = profile?.name || profile?.email?.split("@")?.[0] || "";
  const initial = (profile?.name || profile?.email || "?")
    .charAt(0)
    ?.toUpperCase();

  const handleHeroAvatarClick = () => {
    const formFileInput = document?.getElementById(
      "profile-avatar-input",
    ) as HTMLInputElement;
    if (formFileInput) {
      formFileInput?.click();
    } else {
      fileInputRef?.current?.click();
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-6 sm:p-8 shadow-lg"
    >
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
        <div className="relative shrink-0">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-3xl border-4 border-background bg-muted shadow-xl ring-2 ring-primary/20">
            {displayAvatar ? (
              <Image
                src={displayAvatar}
                alt={displayName}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-linear-to-br from-primary to-brand-accent text-white text-4xl font-black">
                {initial}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleHeroAvatarClick}
            className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform cursor-pointer"
            aria-label={t("uploadNew")}
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 flex-1 text-center sm:text-start">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            {displayName}
          </h2>

          <p
            className="text-xs sm:text-sm text-muted-foreground truncate max-w-full"
            dir="ltr"
          >
            {profile?.email}
          </p>

          <div className="flex items-center gap-2 flex-wrap mt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black">
              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
              {t("accountVerified")}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-black">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {t("memberSince")} {memberSinceDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
