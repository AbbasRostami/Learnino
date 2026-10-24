"use client";

import { FooterBottom } from "./FooterBottom";
import { FooterBrand } from "./FooterBrand";
import { FooterNavLinks } from "./FooterNavLinks";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterStats } from "./FooterStats";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-linear-to-b from-background via-card/30 to-background pt-20 pb-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-accent/20 dark:bg-brand-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <FooterStats />
        <FooterNewsletter />

        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          <FooterBrand />
          <FooterNavLinks />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
