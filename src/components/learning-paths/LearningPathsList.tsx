"use client";

import { Link } from "@/i18n/routing";
import { LEARNING_PATHS } from "@/lib/learning-paths-data";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, Briefcase, Clock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function LearningPathsList() {
  const t = useTranslations("learningPathsPage");
  const tPaths = useTranslations("learningPaths.paths");
  const tLevels = useTranslations("learningPathsPage.levels");
  const tDetails = useTranslations("learningPathsPage.pathDetails");

  const delayClasses = [
    "[animation-delay:0ms]",
    "[animation-delay:120ms]",
    "[animation-delay:240ms]",
    "[animation-delay:360ms]",
    "[animation-delay:480ms]",
    "[animation-delay:600ms]",
  ];

  return (
    <section aria-labelledby="lp-list-title" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-bold text-primary-700 dark:text-primary-300 shadow-xs mb-4">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("pathsSection.badge")}</span>
          </div>
          <h2
            id="lp-list-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4"
          >
            {t.rich("pathsSection.title", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                </span>
              ),
            })}
          </h2>
          <p className="text-base text-foreground/80 font-medium leading-relaxed">
            {t("pathsSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {LEARNING_PATHS.map((path, index) => (
            <article
              key={path.slug}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-backwards motion-reduce:animate-none",
                delayClasses[index % delayClasses.length],
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500",
                  path.bgGradient,
                )}
                aria-hidden="true"
              />

              <div
                className={cn(
                  "absolute -top-24 -right-24 h-56 w-56 rounded-full bg-linear-to-br opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500",
                  path.gradient,
                )}
                aria-hidden="true"
              />

              <div className="relative p-4">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 motion-reduce:group-hover:transform-none",
                      path.gradient,
                    )}
                  >
                    <path.icon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-foreground/85">
                    {tLevels(path.level)}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                  {tPaths(`${path.slug}.title`)}
                </h3>
                <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-6">
                  {tPaths(`${path.slug}.description`)}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {path.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-dashed border-border/60">
                  <div className="flex flex-col items-center gap-1">
                    <BookOpen
                      className="h-4 w-4 text-foreground/70"
                      aria-hidden="true"
                    />
                    <span className="text-lg font-black text-foreground">
                      {path.courses}
                    </span>
                    <span className="text-xs text-foreground/80 font-bold">
                      {tDetails("courses")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-dashed border-border/60">
                    <Briefcase
                      className="h-4 w-4 text-foreground/70"
                      aria-hidden="true"
                    />
                    <span className="text-lg font-black text-foreground">
                      {path.projects}
                    </span>
                    <span className="text-xs text-foreground/80 font-bold">
                      {tDetails("projects")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Clock
                      className="h-4 w-4 text-foreground/70"
                      aria-hidden="true"
                    />
                    <span className="text-lg font-black text-foreground">
                      {path.hours}
                    </span>
                    <span className="text-xs text-foreground/80 font-bold">
                      {tDetails("hours")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/courses"
                  className={cn(
                    "group/btn inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-linear-to-r text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 min-h-11 motion-reduce:transition-none",
                    path.gradient,
                  )}
                >
                  <span>{tDetails("startPath")}</span>
                  <ArrowLeft
                    className="h-4 w-4 rtl:rotate-180 group-hover/btn:-translate-x-1 rtl:group-hover/btn:translate-x-1 transition-transform motion-reduce:group-hover/btn:transform-none"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
