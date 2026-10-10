"use client";

import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyBlogState() {
  const t = useTranslations("blog");

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 px-4 rounded-[2rem] border border-dashed border-border/60 bg-muted/20">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-card border border-border shadow-xl">
          <SearchX className="h-10 w-10 text-muted-foreground/60" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-black text-foreground">{t("noResults")}</h3>
        <p className="text-sm font-medium text-muted-foreground">
          لطفاً فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید
        </p>
      </div>
    </div>
  );
}
