"use client";

import { Compass, Route } from "lucide-react";
import { useTranslations } from "next-intl";

export function LearningPathsHero() {
  const t = useTranslations("learningPathsPage.hero");

  return (
    <section
      aria-labelledby="lp-hero-title"
      className="relative overflow-hidden py-16 md:py-28"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-1/4 h-64 w-64 md:h-72 md:w-72 rounded-full bg-primary/15 blur-3xl md:animate-float motion-reduce:animate-none" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 md:h-72 md:w-72 rounded-full bg-brand-accent/15 blur-3xl md:animate-float-delayed motion-reduce:animate-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>

          <h1
            id="lp-hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both"
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

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both">
            {t("description")}
          </p>

          <div
            className="mt-10 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-3xl bg-linear-to-br from-primary via-brand-accent to-brand-cyan shadow-xl md:shadow-2xl animate-in fade-in-0 zoom-in-90 duration-700 delay-300 fill-mode-both md:animate-float"
            aria-hidden="true"
          >
            <Route className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
