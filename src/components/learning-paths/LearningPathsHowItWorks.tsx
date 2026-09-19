"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Compass, BookOpen, Code2, Award, Zap } from "lucide-react";

const STEPS = [
  { key: "choose", icon: Compass, color: "from-primary to-indigo-500" },
  { key: "learn", icon: BookOpen, color: "from-brand-accent to-purple-500" },
  { key: "practice", icon: Code2, color: "from-brand-cyan to-cyan-500" },
  { key: "certificate", icon: Award, color: "from-emerald-500 to-teal-500" },
] as const;

export function LearningPathsHowItWorks() {
  const t = useTranslations("learningPathsPage.howItWorks");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="lp-how-title"
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-xs font-semibold text-amber-600 dark:text-amber-400 shadow-sm mb-4">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>
          <h2
            id="lp-how-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {chunks}
                  </span>
                </span>
              ),
            })}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div
            className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-linear-to-r from-primary via-brand-accent to-emerald-500 opacity-30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number */}
                <div className="relative z-10">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${step.color} shadow-xl ring-4 ring-background`}
                  >
                    <step.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary text-primary text-xs font-black shadow-md">
                    {index + 1}
                  </div>
                </div>

                <h3 className="mt-6 text-base font-bold text-foreground mb-2">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-50">
                  {t(`steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}