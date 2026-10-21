"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

interface AppBreadcrumbProps {
  items?: BreadcrumbItemType[];
  showHome?: boolean;
  maxItems?: number;
  className?: string;
}

export function AppBreadcrumb({
  items,
  showHome = true,
  maxItems = 4,
  className,
}: AppBreadcrumbProps) {
  const t = useTranslations("breadcrumb");
  const locale = useLocale();
  const pathname = usePathname();
  const dir = locale === "fa" ? "rtl" : "ltr";

  const breadcrumbItems: BreadcrumbItemType[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    const segments = pathname.split("/").filter(Boolean);
    const generated: BreadcrumbItemType[] = [];

    let accumulatedPath = "";

    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      const label = t.has(segment)
        ? t(segment)
        : decodeURIComponent(segment).replace(/-/g, " ");

      generated.push({
        label,
        href: isLast ? undefined : accumulatedPath,
      });
    });

    return generated;
  }, [items, pathname, t]);

  const allItems = React.useMemo(() => {
    if (!showHome) return breadcrumbItems;

    const homeItem: BreadcrumbItemType = {
      label: t("home"),
      href: breadcrumbItems.length > 0 ? "/" : undefined,
    };

    return [homeItem, ...breadcrumbItems];
  }, [showHome, breadcrumbItems, t]);

  if (allItems.length <= 1 && !items) {
    return null;
  }

  const shouldCollapse = allItems.length > maxItems;
  const itemsToRender = shouldCollapse
    ? [allItems[0], { label: "..." }, ...allItems.slice(-2)]
    : allItems;

  return (
    <>
      <Breadcrumb dir={dir} className={cn("py-4", className)}>
        <BreadcrumbList className="text-xs sm:text-sm font-medium">
          {itemsToRender.map((item, index) => {
            const isLast = index === itemsToRender.length - 1;
            const isEllipsis = item.label === "...";

            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbSeparator aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 rtl:rotate-180" />
                  </BreadcrumbSeparator>
                )}

                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-bold text-foreground truncate max-w-50 sm:max-w-75">
                      {item.label}
                    </BreadcrumbPage>
                  ) : isEllipsis ? (
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  ) : (
                    <BreadcrumbLink
                      render={
                        <Link
                          href={item.href || "/"}
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {index === 0 && showHome && (
                            <Home className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
