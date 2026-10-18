"use client";

import { Code2, Radio, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroFloatingBadges() {
  const t = useTranslations("hero");

  return (
    <>
      <div
        className="absolute -top-4 inset-s-4 sm:top-8 sm:inset-s-0 z-20 hidden sm:flex items-center gap-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-2.5 shadow-lg shadow-primary/10 animate-float motion-reduce:animate-none"
        aria-hidden="true"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Code2 className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Frontend</span>
          <span className="text-sm font-bold text-foreground" dir="ltr">
            {t("floatingBadge1")}
          </span>
        </div>
      </div>

      <div
        className="absolute -bottom-4 inset-e-4 sm:bottom-16 sm:inset-e-0 z-20 hidden sm:flex items-center gap-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/60 px-4 py-2.5 shadow-lg shadow-brand-accent/10 animate-float-delayed motion-reduce:animate-none"
        aria-hidden="true"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
          <Radio className="h-4 w-4" />
          <span className="absolute -top-0.5 -inset-e-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">LIVE</span>
          <span className="text-sm font-bold text-foreground">
            {t("floatingBadge2")}
          </span>
        </div>
      </div>

      <div
        className="absolute top-1/4 inset-e-4 z-20 hidden lg:block text-brand-accent animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      >
        <Sparkles className="h-6 w-6 drop-shadow-lg" />
      </div>

      <div
        className="absolute bottom-1/3 inset-s-8 z-20 hidden lg:block text-primary animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      >
        <Zap className="h-5 w-5 drop-shadow-lg fill-primary" />
      </div>
    </>
  );
}
