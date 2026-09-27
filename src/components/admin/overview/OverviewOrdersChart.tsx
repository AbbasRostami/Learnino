"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AdminOrderStats } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { Package } from "lucide-react";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

interface OverviewOrdersChartProps {
  order: AdminOrderStats;
  locale: string;
  t: (key: string) => string;
}

export function OverviewOrdersChart({
  order,
  locale,
  t,
}: OverviewOrdersChartProps) {
  const chartData = useMemo(() => {
    return [
      { status: "paid", count: order?.paid, fill: "var(--color-paid)" },
      { status: "pending", count: order?.pending, fill: "var(--color-pending)" },
      { status: "cancelled", count: order?.cancelled, fill: "var(--color-cancelled)" },
    ];
  }, [order]);

  const chartConfig = {
    orders: { label: t("ordersChart.totalOrders") },
    paid: { label: t("ordersChart.paid"), color: "var(--chart-2)" },
    pending: { label: t("ordersChart.pending"), color: "var(--chart-4)" },
    cancelled: { label: t("ordersChart.cancelled"), color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full flex flex-col">
      <CardHeader className="pb-2 border-b border-border/40 shrink-0">
        <CardTitle className="text-base font-black flex items-center gap-2">
          <Package className="h-4 w-4 text-brand-accent" />
          <span>{t("ordersChart.title")}</span>
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          {t("ordersChart.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex items-center justify-center pt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-55 w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={65}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-black font-mono"
                        >
                          {formatNumber(order?.total, locale)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-[10px] font-bold"
                        >
                          {t("ordersChart.totalOrders")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}