import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HeroFloatingBadges } from "./HeroFloatingBadges";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 h-72 w-72 rounded-full bg-brand-accent/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/10 blur-[100px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.4)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-start gap-5 md:gap-6 order-1">
            <div className="lg:hidden relative w-24 h-24 sm:w-32 sm:h-32 mb-2">
              <div
                className="absolute inset-0 -m-4 rounded-full bg-linear-to-tr from-primary/30 via-brand-accent/20 to-brand-cyan/30 blur-2xl"
                aria-hidden="true"
              />
              <Image
                src="/logo/HeroSection.png"
                alt={t("imageAlt")}
                fill
                priority
                fetchPriority="high"
                quality={75}
                sizes="(max-width: 640px) 96px, 128px"
                className="object-contain drop-shadow-xl relative z-10"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/15 text-xs sm:text-sm text-primary-950 dark:text-primary-100 font-extrabold backdrop-blur-sm">
              <Sparkles
                className="h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
              <span>{t("badge")}</span>
            </div>

            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-foreground leading-[1.15]"
            >
              {t("titlePart1")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
                  {t("titlePart2")}
                </span>
                <svg
                  className="absolute -bottom-2 inset-s-0 w-full text-brand-accent/40"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q75 2 150 8 T298 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
              <Link
                href="/courses"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-8 rounded-full text-base font-bold cursor-pointer",
                  "bg-linear-to-r from-primary via-primary to-brand-accent",
                  "hover:opacity-90 hover:shadow-xl hover:shadow-primary/30",
                  "text-primary-foreground shadow-lg shadow-primary/25",
                  "transition-all duration-300 motion-reduce:transition-none",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
                aria-label={t("ctaPrimary")}
              >
                {t("ctaPrimary")}
                <ArrowLeft
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/learning-paths"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 px-8 rounded-full text-base font-bold cursor-pointer",
                  "border-border/60 hover:border-primary hover:bg-primary/5",
                  "transition-all duration-300 motion-reduce:transition-none",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                {t("ctaSecondary")}
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span
                  className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
                  aria-hidden="true"
                />
                <span>{t("features.certificate")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="flex h-2 w-2 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"
                  aria-hidden="true"
                />
                <span>{t("features.support")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="flex h-2 w-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"
                  aria-hidden="true"
                />
                <span>{t("features.projects")}</span>
              </div>
            </div>
          </div>

          <div className="relative order-2 hidden lg:flex justify-center items-center">
            <HeroFloatingBadges />

            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div
                className="absolute inset-0 -m-8 rounded-full bg-linear-to-tr from-primary/20 via-brand-accent/15 to-brand-cyan/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative aspect-square w-full">
                <Image
                  src="/logo/HeroSection.png"
                  alt={t("imageAlt")}
                  fill
                  priority
                  fetchPriority="high"
                  quality={75}
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) 400px, 480px"
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
