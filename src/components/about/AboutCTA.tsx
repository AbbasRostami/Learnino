"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Rocket } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function AboutCTA() {
  const t = useTranslations("aboutPage.cta");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="about-cta-title" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }
          }
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }
          }
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/10 p-10 md:p-16 text-center shadow-2xl"
        >
          <div
            className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-brand-accent shadow-lg mb-6">
              <Rocket className="h-8 w-8 text-white" aria-hidden="true" />
            </div>

            <h2
              id="about-cta-title"
              className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight mb-4"
            >
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-linear-to-r from-primary to-brand-accent bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  </span>
                ),
              })}
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow motion-reduce:transition-none"
              >
                <Link href="/auth/register" className="gap-2">
                  <span>{t("primary")}</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/courses">{t("secondary")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
