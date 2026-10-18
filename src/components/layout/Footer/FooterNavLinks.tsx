"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterNavLinks() {
  const t = useTranslations("footer");

  const suggestedCourses = [
    { titleKey: "courseHtmlCss" as const, href: "/courses/html-css" },
    { titleKey: "courseJavascript" as const, href: "/courses/javascript" },
    { titleKey: "courseReactNext" as const, href: "/courses/react-next" },
    { titleKey: "coursePython" as const, href: "/courses/python" },
  ];

  const quickAccess = [
    { titleKey: "linkLearningPaths" as const, href: "/learning-paths" },
    { titleKey: "linkSql" as const, href: "/courses/sql" },
    { titleKey: "linkBlog" as const, href: "/blog" },
    { titleKey: "linkFaq" as const, href: "/faq" },
  ];

  return (
    <>
      <div className="lg:col-span-3 flex flex-col gap-4">
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
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                {t(item.titleKey)}
              </span>
              <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ms-auto rtl:rotate-90" />
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
        <div className="flex flex-col gap-1">
          {quickAccess.map((item) => (
            <Link
              key={item.titleKey}
              href={item.href}
              className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-brand-accent group-hover:w-4 transition-all duration-300" />
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                {t(item.titleKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}