"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const THEMES = [
  { value: "light", icon: Sun, labelKey: "light" },
  { value: "dark", icon: Moon, labelKey: "dark" },
  { value: "system", icon: Monitor, labelKey: "system" },
];

const LANGUAGES = [
  { value: "fa", label: "فارسی", flag: "🇮🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
];

export function SettingsAppearance() {
  const t = useTranslations("theme");
  const tDashboard = useTranslations("dashboard");
  const { theme, setTheme } = useTheme();
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5">
      <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Palette className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-black text-foreground">
            {tDashboard("themeSection")}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          {tDashboard("themeDescription")}
        </p>

        <div className="grid grid-cols-3 gap-2 max-w-md">
          {THEMES?.map((th) => {
            const isActive = theme === th?.value;
            return (
              <button
                key={th?.value}
                type="button"
                onClick={() => setTheme(th?.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer",
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-md"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted",
                )}
                aria-pressed={isActive}
              >
                <th.icon className="h-5 w-5" aria-hidden="true" />
                <span>{t(th?.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
            <Globe className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-black text-foreground">
            {tDashboard("languageSection")}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          {tDashboard("languageDescription")}
        </p>

        <div className="grid grid-cols-2 gap-2 max-w-md">
          {LANGUAGES?.map((lang) => {
            const isActive = currentLocale === lang?.value;
            return (
              <Link
                key={lang?.value}
                href={pathname}
                locale={lang?.value}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer",
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-md"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted",
                )}
              >
                <span className="text-lg">{lang?.flag}</span>
                <span>{lang?.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
