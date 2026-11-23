"use client";

import { Separator } from "@/components/ui/separator";
import { Heart, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const CURRENT_YEAR = new Date().getFullYear();

const DEVELOPERS = [
  {
    name: "Abbas Rostami",
    nameEn: "Abbas Rostami",
    role: "Software Engineer",
    github: "https://github.com/AbbasRostami",
    avatar: "https://github.com/AbbasRostami.png",
  },
] as const;

export function FooterBottom() {
  const t = useTranslations("footer");

  return (
    <>
      <div className="relative my-8">
        <Separator className="opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-background border border-border shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 text-xs text-muted-foreground w-full">
        <div className="flex-1 flex justify-center lg:justify-start w-full order-3 lg:order-1">
          <p className="flex items-center gap-2 text-center lg:text-start">
            <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>
              © {CURRENT_YEAR} {t("rights")}
            </span>
          </p>
        </div>

        <div className="flex-[1.5] flex justify-center w-full order-1 lg:order-2">
          <div
            dir="ltr"
            className="flex flex-col items-center w-full relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-linear-to-l from-primary/50 to-transparent" />
              <h4 className="text-2xs sm:text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                Designed & Developed by
                <Sparkles className="h-3 w-3 text-primary" />
              </h4>
              <span className="h-px w-8 bg-linear-to-r from-primary/50 to-transparent" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              {DEVELOPERS.map((dev) => (
                <div
                  key={dev.nameEn}
                  className="group relative flex items-center justify-between gap-3 p-2.5 ps-4 pe-2.5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xs hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto sm:min-w-60"
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-center gap-3 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/25 rounded-full blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background group-hover:border-primary/50 transition-colors shrink-0 z-10">
                        <Image
                          src={dev.avatar}
                          alt={dev.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <span className="absolute bottom-0 inset-e-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full z-20" />
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap tracking-wide">
                        {dev.name}
                      </span>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-widest mt-0.5 group-hover:text-foreground/80 transition-colors">
                        {dev.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 shrink-0 overflow-hidden group/btn shadow-2xs"
                    aria-label={`GitHub ${dev.nameEn}`}
                  >
                    <FaGithub
                      size={16}
                      className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full order-2 lg:order-3">
          <p className="flex items-center gap-1.5">
            <span>{t("brand.madeWith")}</span>
            <Heart className="h-3.5 w-3.5 fill-destructive text-destructive animate-pulse" />
          </p>
        </div>
      </div>
    </>
  );
}
