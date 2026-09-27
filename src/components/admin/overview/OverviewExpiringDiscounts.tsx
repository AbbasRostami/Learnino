"use client";

import { Card } from "@/components/ui/card";
import type { ExpiringDiscount } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import { Tag } from "lucide-react";

interface OverviewExpiringDiscountsProps {
  discounts: ExpiringDiscount[];
  locale: string;
  t: (key: string) => string;
}

export function OverviewExpiringDiscounts({
  discounts,
  locale,
  t,
}: OverviewExpiringDiscountsProps) {
  if (!discounts || discounts?.length === 0) return null;

  return (
    <Card className="rounded-3xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-black text-foreground">
          {t("expiringDiscounts.title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {discounts?.map((d) => (
          <div
            key={d?.id}
            className="flex items-center justify-between p-3 rounded-2xl border border-amber-500/20 bg-background/80"
          >
            <span className="font-mono font-black text-primary text-xs tracking-wider">
              {d?.code}
            </span>
            <span
              className="text-[10px] text-muted-foreground font-semibold"
              suppressHydrationWarning
            >
              {formatRelativeTime(d?.expiresAt, locale)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
