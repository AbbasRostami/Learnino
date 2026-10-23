"use client";

import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  Infinity as InfinityIcon,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Feature {
  key: "quality" | "community" | "certificate" | "lifetime";
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const FEATURES: Feature[] = [
  {
    key: "quality",
    icon: Award,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-500/10 dark:bg-amber-400/10",
  },
  {
    key: "community",
    icon: Users,
    color: "text-sky-500 dark:text-sky-400",
    bgColor: "bg-sky-500/10 dark:bg-sky-400/10",
  },
  {
    key: "certificate",
    icon: BookOpen,
    color: "text-violet-500 dark:text-violet-400",
    bgColor: "bg-violet-500/10 dark:bg-violet-400/10",
  },
  {
    key: "lifetime",
    icon: InfinityIcon,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-400/10",
  },
];

export function AboutSection() {
  const t = useTranslations("about");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary w-fit shadow-xs">
            <span className="text-lg">{t("sectionBadge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2]">
            {t.rich("sectionTitle", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                  <svg
                    className="absolute -bottom-1.5 inset-s-0 w-full text-brand-accent/40"
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

          <p className="text-base text-muted-foreground leading-relaxed">
            {t("sectionDescription")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, x: -20 }
                  }
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs",
                      feature.bgColor,
                      feature.color,
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative order-1 lg:order-2 flex justify-center items-center">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-brand-accent/20 rounded-full blur-3xl opacity-50" />

          <motion.div
            initial={
              prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }
            }
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md lg:max-w-lg aspect-square"
          >
            <Image
              src="/logo/LEARNINO.png"
              alt="درباره لرنینو"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
