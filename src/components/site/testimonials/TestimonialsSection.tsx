"use client";

import { TESTIMONIALS } from "@/lib/testimonials";
import { MessageSquareHeart } from "lucide-react";
import { useTranslations } from "next-intl";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-5"
      aria-labelledby="testimonials-title"
    >
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-xs">
          <MessageSquareHeart className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("sectionBadge")}</span>
        </div>

        <h2
          id="testimonials-title"
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight"
        >
          {t.rich("sectionTitle", {
            highlight: (chunks) => (
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
                  {chunks}
                </span>
                <svg
                  className="absolute -bottom-1.5 inset-s-0 w-full text-brand-accent/40"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q75 2 150 8 T298 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ),
          })}
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t("sectionDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TESTIMONIALS?.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial?.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
