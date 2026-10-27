"use client";

import { cn } from "@/lib/utils";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";

interface CarouselProps {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  enableAutoplay?: boolean;
  autoplayDelay?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  containerClassName?: string;
  headerContent?: React.ReactNode;
  actionContent?: React.ReactNode;
  dotAriaLabel?: (index: number) => string;
}

export function Carousel({
  children,
  options,
  enableAutoplay = false,
  autoplayDelay = 4000,
  showControls = true,
  showDots = true,
  className,
  containerClassName,
  dotAriaLabel,
}: CarouselProps) {
  const locale = useLocale();
  const dir = locale === "fa" ? "rtl" : "ltr";
  const t = useTranslations("common");

  const mergedOptions: EmblaOptionsType = {
    direction: dir,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    ...options,
  };

  const plugins = enableAutoplay
    ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, plugins);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className={cn("relative w-full max-w-full overflow-hidden", className)}
      role="region"
      aria-roledescription="carousel"
      dir={dir}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex touch-pan-y py-3", containerClassName)}>
          {children}
        </div>
      </div>

      {(showDots || showControls) && (
        <div className="mt-4 flex justify-center items-center gap-4 max-w-full px-2">
          {/* <div className="flex items-center justify-start">
            {showControls && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="اسلاید قبلی"
                className="h-10 w-10 rounded-full border-border/80 bg-background/80 backdrop-blur-md shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5 hidden rtl:block" />
                <ChevronLeft className="h-5 w-5 rtl:hidden" />
              </Button>
            )}
          </div> */}

          <div className="flex flex-wrap items-center justify-center gap-0.5 max-w-full">
            {showDots &&
              scrollSnaps.length > 1 &&
              scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={
                    dotAriaLabel
                      ? dotAriaLabel(index + 1)
                      : t("goToSlide", { slide: index + 1 })
                  }
                  className="p-1.5 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === selectedIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                    )}
                  />
                </button>
              ))}
          </div>

          {/* <div className="flex items-center justify-end">
            {showControls && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="اسلاید بعدی"
                className="h-10 w-10 rounded-full border-border/80 bg-background/80 backdrop-blur-md shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5 hidden rtl:block" />
                <ChevronRight className="h-5 w-5 rtl:hidden" />
              </Button>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
