"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export function AuthButtons() {
  const t = useTranslations("nav");

  return (
    <Link
      href="/login"
      aria-label={t("loginRegister")}
      className={cn(
        buttonVariants({ size: "default" }),
        "h-9 rounded-full px-3 md:px-4 gap-2",
        "bg-linear-to-r from-primary via-primary to-brand-accent",
        "text-sm font-semibold text-primary-foreground",
        "shadow-md shadow-primary/20 hover:opacity-90",
        "cursor-pointer transition-all active:scale-95",
        "inline-flex items-center justify-center",
      )}
    >
      <LogIn className="size-4 shrink-0" aria-hidden="true" />
      <span className="hidden md:inline leading-none">
        {t("loginRegister")}
      </span>
    </Link>
  );
}
