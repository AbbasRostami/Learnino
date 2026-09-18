import { getFreeCoursesServer } from "@/services/course/courses";
import { Gift } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { FreeCoursesCarousel } from "./FreeCoursesCarousel";

export async function FreeCoursesSection() {
  const locale = await getLocale();
  const t = await getTranslations("freeCourses");

  const courses = await getFreeCoursesServer(locale, 8);

  if (!courses || courses?.length === 0) return null;

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-labelledby="free-courses-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm">
            <Gift className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("sectionBadge")}</span>
          </div>

          <h2
            id="free-courses-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight"
          >
            {t.rich("sectionTitle", {
              highlight: (chunks) => (
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    {chunks}
                  </span>
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 inset-s-0 w-full text-emerald-500/40"
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
      </div>

      <FreeCoursesCarousel courses={courses} />
    </section>
  );
}
