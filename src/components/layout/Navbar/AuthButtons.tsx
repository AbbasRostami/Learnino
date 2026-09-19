"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export function AuthButtons() {
  const t = useTranslations("nav");

  return (
    <Link
      href="/login"
      className={buttonVariants({
        size: "default",
        className:
          "cursor-pointer rounded-full h-10 px-5 text-sm font-semibold bg-linear-to-r from-primary via-primary to-brand-accent hover:opacity-90 text-primary-foreground shadow-md shadow-primary/20 transition-all active:scale-95",
      })}
    >
      <LogIn className="h-4 w-4" />
      <span>{t("loginRegister")}</span>
    </Link>
  );
}
