import { Link } from "@/i18n/routing";
import { LEARNING_PATHS } from "@/lib/learning-paths";
import { ArrowRight, Map } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LearningPathCard } from "./LearningPathCard";

export async function LearningPathsSection() {
  const t = await getTranslations("learningPaths");

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-labelledby="learning-paths-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary w-fit shadow-xs">
            <Map className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("sectionBadge")}</span>
          </div>
          <h2
            id="learning-paths-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight"
          >
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            {t("sectionDescription")}
          </p>
        </div>

        <Link
          href="/learning-paths"
          className="group text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEARNING_PATHS?.map((path, index) => (
          <LearningPathCard key={path?.key} path={path} index={index} />
        ))}
      </div>
    </section>
  );
}
