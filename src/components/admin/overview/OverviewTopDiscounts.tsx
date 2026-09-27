"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TopUsedDiscount } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { Tag } from "lucide-react";
import { useTranslations } from "next-intl";
type OverviewT = ReturnType<typeof useTranslations<"admin.overview">>;

export function OverviewTopDiscounts({
  discounts,
  locale,
  t,
}: {
  discounts: TopUsedDiscount[];
  locale: string;
  t: OverviewT;
}) {
  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full">
      <CardHeader className="pb-3 border-b border-border/40">
        <CardTitle className="text-sm font-black flex items-center gap-2">
          <Tag className="h-4 w-4 text-fuchsia-500" />
          <span>{t("topDiscounts.title")}</span>
        </CardTitle>
        <CardDescription className="text-[11px] mt-0.5">
          {t("topDiscounts.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {discounts?.length ? (
          <div className="flex flex-col gap-3">
            {discounts?.map((d) => {
              const percentage = Math.min(
                100,
                Math.round((d?.usedCount / (d?.maxUses || 1)) * 100),
              );
              return (
                <div
                  key={d?.id}
                  className="flex flex-col gap-2 p-3 rounded-2xl border border-border/40 bg-background/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-primary text-xs tracking-wider">
                      {d?.code}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold">
                      {t("topDiscounts.uses", {
                        used: formatNumber(d?.usedCount, locale),
                        max: formatNumber(d?.maxUses, locale),
                      })}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
            {t("topDiscounts.noDiscounts")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
