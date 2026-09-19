"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Compass, Route } from "lucide-react";

export function LearningPathsHero() {
  const t = useTranslations("learningPathsPage.hero");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="lp-hero-title"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl motion-reduce:animate-none animate-float" />
        <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl motion-reduce:animate-none animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md mb-6"
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            id="lp-hero-title"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6"
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
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-primary via-brand-accent to-brand-cyan shadow-2xl motion-reduce:animate-none animate-float"
            aria-hidden="true"
          >
            <Route className="h-10 w-10 text-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}