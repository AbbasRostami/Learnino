"use client";

import { useProfile } from "@/services";
import { Info, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function ReadOnlyBanner() {
  const { data } = useProfile();
  const t = useTranslations("admin.permission");
  const prefersReducedMotion = useReducedMotion();

  const role = data?.data?.profile?.role;

  if (!role || role !== "ADMIN") return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 p-5"
    >
      <div
        className="absolute -top-10 -inset-e-10 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -inset-s-10 h-28 w-28 rounded-full bg-orange-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500 shadow-lg">
          <Info className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-sm font-black text-amber-700 dark:text-amber-300">
              {t("demoMode.title")}
            </h3>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <p className="text-xs text-amber-700/90 dark:text-amber-300/90 leading-relaxed">
            {t("demoMode.description")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
