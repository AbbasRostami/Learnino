"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function BottomCta() {
  const t = useTranslations("cta");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-labelledby="cta-title"
    >
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/5 to-brand-cyan/10 p-8 sm:p-12 md:p-16 text-center"
      >
        <div
          className="absolute -top-32 -inset-s-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -inset-e-32 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-background/80 backdrop-blur-md text-sm font-semibold text-primary shadow-lg">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>

          <h2
            id="cta-title"
            className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-foreground"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                </span>
              ),
            })}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 rounded-full text-base font-bold cursor-pointer",
                "bg-linear-to-r from-primary via-primary to-brand-accent",
                "hover:opacity-90 hover:shadow-xl hover:shadow-primary/30",
                "text-primary-foreground shadow-lg shadow-primary/25",
                "transition-all duration-300 motion-reduce:transition-none",
              )}
            >
              {t("primary")}
              <ArrowRight
                className="h-4 w-4 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/courses"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 px-8 rounded-full text-base font-bold cursor-pointer border-border/60 hover:border-primary hover:bg-primary/5",
              )}
            >
              {t("secondary")}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
