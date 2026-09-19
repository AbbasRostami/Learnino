"use client";

import { Heart, Rocket, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function AboutHero() {
  const t = useTranslations("aboutPage.hero");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl motion-reduce:animate-none animate-float" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-accent/20 blur-3xl motion-reduce:animate-none animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            id="about-hero-title"
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
            initial={
              prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }
            }
            animate={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8"
            aria-hidden="true"
          >
            {[
              { icon: Heart, color: "text-rose-500", label: "Passion" },
              {
                icon: Sparkles,
                color: "text-brand-accent",
                label: "Innovation",
              },
              { icon: Rocket, color: "text-brand-cyan", label: "Growth" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border/50 shadow-sm motion-reduce:animate-none animate-float"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
