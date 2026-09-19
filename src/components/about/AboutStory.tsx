"use client";

import { Milestone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const STEPS = ["step1", "step2", "step3", "step4"] as const;

export function AboutStory() {
  const t = useTranslations("aboutPage.story");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="about-story-title" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-xs font-semibold text-brand-accent shadow-sm mb-4">
            <Milestone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>
          <h2
            id="about-story-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-brand-accent to-primary bg-clip-text text-transparent">
                    {chunks}
                  </span>
                </span>
              ),
            })}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute inset-s-4 md:inset-s-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-brand-accent to-brand-cyan"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={step}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, x: -20 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-end"
                }`}
              >
                <div className="relative shrink-0 md:absolute md:inset-s-1/2 md:-translate-x-1/2 z-10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-primary to-brand-accent shadow-lg ring-4 ring-background">
                    <span className="text-white text-xs font-black">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 md:max-w-[calc(50%-3rem)]">
                  <article className="p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300 motion-reduce:transition-none">
                    <div className="text-sm font-black text-primary mb-2">
                      {t(`timeline.${step}.year`)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {t(`timeline.${step}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`timeline.${step}.description`)}
                    </p>
                  </article>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
