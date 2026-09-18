"use client";

import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const locale = useLocale() as "fa" | "en";

  const name = testimonial.name[locale] || testimonial.name.fa;
  const role = testimonial.role[locale] || testimonial.role.fa;
  const content = testimonial.content[locale] || testimonial.content.fa;

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col gap-4 p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300 h-full motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="absolute top-4 inset-e-4 text-primary/10">
        <Quote className="h-12 w-12" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground/20",
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed flex-1 relative z-10">
        {content}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-dashed border-border/60 relative z-10">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-sm">
          <Image
            src={testimonial.avatar}
            alt={name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-foreground truncate">
            {name}
          </span>
          <span className="text-xs text-muted-foreground truncate">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}
