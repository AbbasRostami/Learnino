"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const navLinks = [
  { key: "courses", href: "/courses" },
  { key: "learningPaths", href: "/learning-paths" },
  { key: "blog", href: "/blog" },
  { key: "aboutUs", href: "/about" },
] as const;

export function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "relative px-4 py-2 text-base font-medium rounded-full transition-all duration-200",
              isActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
            )}
          >
            <span>{t(link.key)}</span>

            {isActive && (
              <motion.span
                layoutId="navbarActiveUnderline"
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-linear-to-r from-primary via-primary to-brand-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
