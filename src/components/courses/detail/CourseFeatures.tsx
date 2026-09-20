"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  Code2,
  MessageSquare,
  Rocket,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

const FEATURES = [
  { key: "lifetime", icon: Rocket, color: "text-primary", bg: "bg-primary/10" },
  { key: "certificate", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  { key: "support", icon: MessageSquare, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { key: "projectBased", icon: Code2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "updates", icon: Zap, color: "text-brand-cyan", bg: "bg-brand-cyan/10" },
  { key: "community", icon: Users, color: "text-rose-500", bg: "bg-rose-500/10" },
] as const;

export function CourseFeatures() {
  const t = useTranslations("course");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="course-features-title"
      className="p-6 rounded-3xl border border-border/50 bg-card shadow-sm"
    >
      <h2
        id="course-features-title"
        className="text-xl font-black text-foreground mb-6 flex items-center gap-2"
      >
        <span className="h-6 w-1 rounded-full bg-linear-to-b from-primary to-brand-accent" />
        {t("courseFeatures")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.key}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted/40 transition-colors"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}
            >
              <feature.icon className={`h-5 w-5 ${feature.color}`} aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-foreground">
              {t(`features.${feature.key}`)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}