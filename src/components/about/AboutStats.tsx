"use client";

import { BookOpen, Clock, GraduationCap, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const STATS = [
  {
    key: "students",
    value: "2,500+",
    icon: Users,
    color: "from-primary to-indigo-400",
  },
  {
    key: "courses",
    value: "40+",
    icon: BookOpen,
    color: "from-brand-accent to-purple-400",
  },
  {
    key: "instructors",
    value: "15+",
    icon: GraduationCap,
    color: "from-brand-cyan to-cyan-400",
  },
  {
    key: "hours",
    value: "500+",
    icon: Clock,
    color: "from-emerald-500 to-teal-400",
  },
] as const;

export function AboutStats() {
  const t = useTranslations("aboutPage.stats");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-stats-title"
      className="py-16 md:py-20 border-y border-border/50 bg-muted/30"
    >
      <h2 id="about-stats-title" className="sr-only">
        آمار لرنینو
      </h2>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center text-center p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100`}
              >
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-semibold">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
