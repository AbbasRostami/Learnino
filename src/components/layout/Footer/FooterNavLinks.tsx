"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterNavLinks() {
  const t = useTranslations("footer");

  const suggestedCourses = [
    {
      titleKey: "courseReactNext" as const,
      href: "/courses/react-19-nextjs-15-masterclass",
    },
    {
      titleKey: "courseJavascript" as const,
      href: "/courses/complete-javascript-typescript-bootcamp",
    },
    {
      titleKey: "coursePython" as const,
      href: "/courses/python-for-machine-learning-data-science",
    },
    {
      titleKey: "courseCleanCode" as const,
      href: "/courses/clean-code-design-patterns-architecture",
    },
  ];

  const quickAccess = [
    { titleKey: "linkLearningPaths" as const, href: "/learning-paths" },
    { titleKey: "linkBlog" as const, href: "/blog" },
    { titleKey: "linkAbout" as const, href: "/about" },
    {
      titleKey: "courseFigma" as const,
      href: "/courses/advanced-design-systems-in-figma",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-linear-to-b from-primary to-brand-accent" />
          <h3 className="text-sm font-black text-foreground tracking-wide">
            {t("suggestedCourses")}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          {suggestedCourses.map((item) => (
            <Link
              key={item.titleKey}
              href={item.href}
              className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary group-hover:w-4 transition-all duration-300" />
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform truncate">
                {t(item.titleKey)}
              </span>
              <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ms-auto shrink-0 rtl:rotate-90" />
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-linear-to-b from-brand-accent to-brand-cyan" />
          <h3 className="text-sm font-black text-foreground tracking-wide">
            {t("quickLinks")}
          </h3>
        </div>
        <div className="w-full flex flex-col gap-1">
          {quickAccess.map((item) => (
            <Link
              key={item.titleKey}
              href={item.href}
              className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-brand-accent group-hover:w-4 transition-all duration-300" />
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform truncate">
                {t(item.titleKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
