import { Link } from "@/i18n/routing";
import { getPublicCategoriesServer } from "@/services/category/categories";
import { ArrowRight, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CategoriesCarousel } from "./CategoriesCarousel";

export async function CategoriesSection() {
  const locale = await getLocale();
  const t = await getTranslations("category");

  const categories = await getPublicCategoriesServer(locale);

  if (categories.length === 0) return null;

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-labelledby="categories-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary w-fit shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("sectionBadge")}</span>
          </div>

          <h2
            id="categories-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight"
          >
            {t.rich("sectionTitle", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
                    {chunks}
                  </span>
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 inset-s-0 w-full text-brand-accent/50"
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
        </div>

        <Link
          href="/courses"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/60 bg-card/60 backdrop-blur-md text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm w-fit shrink-0"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      <CategoriesCarousel categories={categories} />
    </section>
  );
}
