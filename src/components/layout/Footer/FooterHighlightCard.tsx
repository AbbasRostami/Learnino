"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterHighlightCard() {
  const t = useTranslations("footer");

  return (
    <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/10 dark:from-primary/15 dark:via-brand-accent/15 dark:to-brand-cyan/15 p-5 shadow-sm">
      <Sparkles className="absolute top-3 right-3 h-4 w-4 text-primary/40 animate-pulse" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />

      <div className="relative flex flex-col gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-brand-accent text-primary-foreground shadow-md shadow-primary/30">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="text-base font-black text-foreground">
          {t("highlightTitle")}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("highlightText")}
        </p>
      </div>
    </div>
  );
}