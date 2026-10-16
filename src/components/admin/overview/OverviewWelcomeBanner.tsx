"use client";

import { ReadOnlyBadge } from "../shared";

interface OverviewWelcomeBannerProps {
  title: string;
  subtitle: string;
}

export function OverviewWelcomeBanner({
  title,
  subtitle,
}: OverviewWelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-6 sm:p-8 shadow-lg">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
      <div className="relative flex flex-col items-start gap-3">
        <ReadOnlyBadge />

        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
