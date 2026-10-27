"use client";

import { cn } from "@/lib/utils";
import { Heart, Rocket, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const HERO_ICONS = [
  {
    icon: Heart,
    color: "text-rose-500",
    label: "Passion",
    delayClass: "[animation-delay:0ms]",
  },
  {
    icon: Sparkles,
    color: "text-brand-accent",
    label: "Innovation",
    delayClass: "[animation-delay:400ms]",
  },
  {
    icon: Rocket,
    color: "text-brand-cyan",
    label: "Growth",
    delayClass: "[animation-delay:800ms]",
  },
] as const;

export function AboutHero() {
  const t = useTranslations("aboutPage.hero");

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden py-16 md:py-28"
    >
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-80 w-80 md:h-96 md:w-96 rounded-full bg-primary/15 blur-3xl md:animate-float motion-reduce:animate-none" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 md:h-96 md:w-96 rounded-full bg-brand-accent/15 blur-3xl md:animate-float-delayed motion-reduce:animate-none" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>

          <h1
            id="about-hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary via-brand-accent to-brand-cyan bg-clip-text text-transparent">
                    {chunks}
                  </span>
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 inset-s-0 w-full text-brand-accent/40"
                    viewBox="0 0 300 12"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 Q75 2 150 8 T298 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ),
            })}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            {t("description")}
          </p>

          <div
            className="flex items-center justify-center gap-6 sm:gap-8 animate-in fade-in-0 zoom-in-95 duration-700 delay-300 fill-mode-both"
            aria-hidden="true"
          >
            {HERO_ICONS.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-card border border-border/50 shadow-sm animate-float motion-reduce:animate-none transition-transform hover:scale-110",
                  item.delayClass,
                )}
              >
                <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
