"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronLeft, Home } from "lucide-react";
import { useTranslations } from "next-intl";

const KNOWN_BREADCRUMB_KEYS = [
  "admin",
  "overview",
  "users",
  "banned",
  "courses",
  "categories",
  "teachers",
  "posts",
  "comments",
  "orders",
  "wallets",
  "transactions",
  "discounts",
  "create",
  "edit",
  "details",
  "settings",
] as const;

type KnownBreadcrumbKey = (typeof KNOWN_BREADCRUMB_KEYS)[number];

const isKnownKey = (key: string): key is KnownBreadcrumbKey =>
  KNOWN_BREADCRUMB_KEYS.includes(key as KnownBreadcrumbKey);

export function AdminBreadcrumb() {
  const t = useTranslations("admin.breadcrumb");
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const adminIndex = segments.indexOf("admin");
  if (adminIndex !== -1) {
    segments.splice(adminIndex, 1);
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center gap-1 text-xs flex-wrap">
        <li>
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors font-bold",
              segments.length === 0
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5",
            )}
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("admin")}</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/admin/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          const decodedSegment = decodeURIComponent(segment);
          let label = decodedSegment;

          if (isKnownKey(segment)) {
            label = t(segment);
          } else if (label.length > 25) {
            label = `#${label.slice(0, 8)}...`;
          }

          return (
            <li key={`${segment}-${index}`} className="flex items-center gap-1">
              <ChevronLeft
                className="h-3.5 w-3.5 text-muted-foreground/60 rtl:rotate-180 shrink-0"
                aria-hidden="true"
              />
              {isLast ? (
                <span className="px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary font-black truncate max-w-xs">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-bold truncate max-w-xs"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
