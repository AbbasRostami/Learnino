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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AdminRevenueStats } from "@/types";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface OverviewRevenueChartProps {
  revenue: AdminRevenueStats;
  t: (key: string) => string;
}

export function OverviewRevenueChart({
  revenue,
  t,
}: OverviewRevenueChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        name: t("revenueChart.today"),
        sales: revenue?.sales?.today,
        wallet: revenue?.walletCharges?.today,
      },
      {
        name: t("revenueChart.thisWeek"),
        sales: revenue?.sales?.thisWeek,
        wallet: revenue?.walletCharges?.thisWeek,
      },
      {
        name: t("revenueChart.thisMonth"),
        sales: revenue?.sales?.thisMonth,
        wallet: revenue?.walletCharges?.thisMonth,
      },
      {
        name: t("revenueChart.total"),
        sales: revenue?.sales?.total,
        wallet: revenue?.walletCharges?.total,
      },
    ];
  }, [revenue, t]);

  const chartConfig = {
    sales: {
      label: t("revenueChart.sales"),
      color: "var(--chart-1)",
    },
    wallet: {
      label: t("revenueChart.wallet"),
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full">
      <CardHeader className="pb-6 border-b border-border/40">
        <CardTitle className="text-base font-black flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span>{t("revenueChart.title")}</span>
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          {t("revenueChart.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-70 w-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-xs font-bold"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-[10px] font-mono"
              tickFormatter={(val) => `${val / 1000000}M`}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="sales"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="wallet"
              fill="var(--color-wallet)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <ChartLegend content={<ChartLegendContent />} className="mt-4" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
