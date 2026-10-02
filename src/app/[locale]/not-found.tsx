"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { FileQuestion, Home, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("error.notFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <span className="text-[120px] sm:text-[160px] font-black leading-none bg-linear-to-b from-primary/30 to-transparent bg-clip-text text-transparent select-none">
          404
        </span>
        <FileQuestion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 sm:h-20 sm:w-20 text-primary/60" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
        {t("title")}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
        {t("description")}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className={buttonVariants({
            size: "lg",
            className: "rounded-full gap-2 px-8 shadow-lg shadow-primary/20",
          })}
        >
          <Home className="h-4 w-4" />
          <span>{t("backToHome")}</span>
        </Link>

        <Link
          href="/courses"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded-full gap-2 px-8",
          })}
        >
          <Search className="h-4 w-4" />
          <span>{t("searchCourses")}</span>
        </Link>
      </div>
    </div>
  );
}
