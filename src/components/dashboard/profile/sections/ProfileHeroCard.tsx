"use client";

import type { UserProfile } from "@/types";
import { BadgeCheck, Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ProfileHeroCardProps {
  profile: UserProfile;
  displayAvatar: string | null | undefined;
}

export function ProfileHeroCard({
  profile,
  displayAvatar,
}: ProfileHeroCardProps) {
  const t = useTranslations("dashboard");

  const displayName = profile?.name || profile?.email?.split("@")?.[0] || "";
  const initial = (profile?.name || profile?.email || "?")
    .charAt(0)
    ?.toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-6 sm:p-8 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-brand-accent/25 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[24px_24px]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary via-brand-accent to-brand-cyan blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-3xl border-4 border-background bg-muted shadow-xl ring-2 ring-primary/30">
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

          <div
            className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background shadow-md"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 flex-1 text-center sm:text-start">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {displayName}
            </h2>
            <Sparkles
              className="h-5 w-5 text-amber-500 animate-pulse"
              aria-hidden="true"
            />
          </div>

          <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground truncate max-w-full">
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate" dir="ltr">
              {profile?.email}
            </span>
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-black backdrop-blur-sm">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {t("accountVerified")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
