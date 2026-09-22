"use client";

import { Link } from "@/i18n/routing";
import {
  BookOpen,
  Heart,
  Package,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const ACTIONS = [
  {
    key: "myCourses",
    href: "/dashboard/my-courses",
    icon: BookOpen,
    color: "text-primary bg-primary/10",
  },
  {
    key: "orders",
    href: "/dashboard/orders",
    icon: Package,
    color: "text-brand-accent bg-brand-accent/10",
  },
  {
    key: "favorites",
    href: "/dashboard/favorites",
    icon: Heart,
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    key: "cart",
    href: "/cart",
    icon: ShoppingCart,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    key: "profile",
    href: "/dashboard/profile",
    icon: User,
    color: "text-brand-cyan bg-brand-cyan/10",
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-emerald-500 bg-emerald-500/10",
  },
];

export function OverviewQuickActions() {
  const t = useTranslations("dashboard");
  const tNav = useTranslations("nav");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="quick-actions-title">
      <h2
        id="quick-actions-title"
        className="text-sm font-black text-foreground mb-4"
      >
        {t("quickActions")}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {ACTIONS?.map((action, index) => (
          <motion.div
            key={action?.key}
            initial={
              prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }
            }
            animate={
              prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={action?.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all group"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl group-hover:scale-110 transition-transform ${action.color}`}
              >
                <action.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-bold text-foreground text-center truncate w-full">
                {action?.key === "cart"
                  ? tNav("cart")
                  : t(`menu.${action?.key}`)}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
