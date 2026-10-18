"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (newLocale: "fa" | "en") => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="h-9 w-9 rounded-full cursor-pointer hover:bg-accent/80 flex items-center justify-center transition-colors outline-none"
        aria-label={t("toggle")}
        disabled={isPending}
      >
        <Languages className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => changeLocale("fa")}
          className="cursor-pointer"
        >
          <span className="text-lg">🇮🇷</span>
          <span>{t("fa")}</span>
          {locale === "fa" && (
            <span className="ms-auto text-xs text-primary">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLocale("en")}
          className="cursor-pointer"
        >
          <span className="text-lg">en</span>
          <span>{t("en")}</span>
          {locale === "en" && (
            <span className="ms-auto text-xs text-primary">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
