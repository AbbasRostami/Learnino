"use client";

import { Link } from "@/i18n/routing";
import type { LearningPath } from "@/lib/learning-paths";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Clock,
  Code,
  Cpu,
  Layers,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const PATH_ICONS: Record<string, LucideIcon> = {
  frontend: Code,
  backend: Server,
  ai: Cpu,
  mobile: Smartphone,
};

interface LearningPathCardProps {
  path: LearningPath;
  index: number;
}

export function LearningPathCard({ path, index }: LearningPathCardProps) {
  const t = useTranslations("learningPaths");
  const prefersReducedMotion = useReducedMotion();
  const Icon = PATH_ICONS[path?.key] || Code;

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/learning-paths/${path.slug}`}
        className="group relative flex flex-col justify-between p-6 rounded-3xl h-full border border-border/60 bg-card/60 backdrop-blur-md hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none"
      >
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-br opacity-50 pointer-events-none",
            path.gradient,
          )}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl shadow-xs transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100 mb-4",
              path.iconBg,
              path.iconColor,
            )}
          >
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {t(`paths.${path.key}.title`)}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {t(`paths.${path.key}.description`)}
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-dashed border-border/60 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("steps", { count: path.steps })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("duration", { months: path.months })}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
            <span>{t("startPath")}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
