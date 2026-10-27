"use client";

import { Eye, Sparkles, Target, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const CARDS = [
  { key: "vision", icon: Eye, gradient: "from-primary to-indigo-500" },
  { key: "mission", icon: Target, gradient: "from-brand-accent to-purple-500" },
  { key: "goal", icon: TrendingUp, gradient: "from-brand-cyan to-cyan-500" },
] as const;

export function AboutMission() {
  const t = useTranslations("aboutPage.mission");

  const delayClasses = [
    "[animation-delay:0ms]",
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
  ];

  return (
    <section aria-labelledby="about-mission-title" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm mb-4">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>
          <h2
            id="about-mission-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                </span>
              ),
            })}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, index) => (
            <article
              key={card.key}
              className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-backwards motion-reduce:animate-none ${delayClasses[index % delayClasses.length]}`}
            >
              <div
                className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
                aria-hidden="true"
              />

              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${card.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100`}
              >
                <card.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {t(`cards.${card.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`cards.${card.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
