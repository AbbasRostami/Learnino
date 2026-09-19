"use client";

import {
  Award,
  Code2,
  Globe2,
  Heart,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const VALUES = [
  {
    key: "quality",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  { key: "practical", icon: Code2, color: "text-primary", bg: "bg-primary/10" },
  {
    key: "community",
    icon: Users,
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
  },
  {
    key: "growth",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    key: "accessible",
    icon: Globe2,
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
  {
    key: "transparent",
    icon: ShieldCheck,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
] as const;

export function AboutValues() {
  const t = useTranslations("aboutPage.values");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-values-title"
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 text-xs font-semibold text-rose-600 dark:text-rose-400 shadow-sm mb-4">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>
          <h2
            id="about-values-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-rose-500 to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 inset-s-0 w-full text-rose-500/40"
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
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, index) => (
            <motion.article
              key={value.key}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group flex gap-4 p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none"
            >
              <div
                className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${value.bg} group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100`}
              >
                <value.icon
                  className={`h-6 w-6 ${value.color}`}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground mb-2">
                  {t(`items.${value.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`items.${value.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
