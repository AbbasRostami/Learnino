"use client";

import { Link } from "@/i18n/routing";
import { MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export function LearningPathsCTA() {
  const t = useTranslations("learningPathsPage.cta");

  return (
    <section aria-labelledby="lp-cta-title" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/10 p-10 md:p-16 text-center shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500 motion-reduce:animate-none">
          <div
            className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-brand-accent shadow-lg mb-6">
              <MessagesSquare
                className="h-8 w-8 text-white"
                aria-hidden="true"
              />
            </div>

            <h2
              id="lp-cta-title"
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

            <p className="text-base text-foreground/80 font-medium leading-relaxed mb-8 max-w-xl mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all min-h-11 min-w-11 motion-reduce:transition-none"
              >
                {t("secondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}