"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Layers, Briefcase, MessageSquare, Award } from "lucide-react";

const FEATURES = [
  { key: "structured", icon: Layers, color: "text-primary", bg: "bg-primary/10" },
  { key: "projects", icon: Briefcase, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { key: "mentor", icon: MessageSquare, color: "text-brand-cyan", bg: "bg-brand-cyan/10" },
  { key: "certificate", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
] as const;

export function LearningPathsFeatures() {
  const t = useTranslations("learningPathsPage.features");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="lp-features-title"
      className="py-16 border-y border-border/50 bg-muted/30"
    >
      <h2 id="lp-features-title" className="sr-only">
        امکانات مسیرهای یادگیری
      </h2>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} mb-3 group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(`${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}