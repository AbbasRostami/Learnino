"use client";

import { Separator } from "@/components/ui/separator";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const CURRENT_YEAR = new Date().getFullYear();

export function FooterBottom() {
  const t = useTranslations("footer");

  return (
    <>
      <div className="relative my-8">
        <Separator className="opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-background border border-border/60 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p className="flex items-center gap-2 text-center md:text-start">
          <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>
            © {CURRENT_YEAR} {t("rights")}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <p className="flex items-center gap-1.5">
            <span>{t("brand.madeWith")}</span>
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
            <span>{t("brand.loveIn")}</span>
            <MapPin className="h-3 w-3 text-brand-accent" />
          </p>

          <span className="hidden sm:inline-block h-3 w-px bg-border" />

          <p className="flex items-center gap-1.5">
            <span>{t("developedBy")}</span>
            <a
              href="https://github.com/AbbasRostami"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-bold text-foreground hover:text-primary transition-colors relative"
            >
              <span className="relative z-10">Abbas Rostami</span>
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-linear-to-r from-primary via-brand-accent to-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right" />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}