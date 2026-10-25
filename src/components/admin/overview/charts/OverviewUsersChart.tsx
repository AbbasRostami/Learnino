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
import type { AdminUserStats } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { Users } from "lucide-react";
import { useMemo } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

export function OverviewUsersChart({
  user,
  locale,
  t,
}: {
  user: AdminUserStats;
  locale: string;
  t: (key: string) => string;
}) {
  const chartData = useMemo(() => {
    return [
      { name: "verified", value: user.verified, color: "var(--chart-1)" },
      { name: "unverified", value: user.unverified, color: "var(--chart-2)" },
      { name: "admins", value: user.admins, color: "var(--chart-3)" },
    ];
  }, [user]);

  const chartConfig = {
    users: { label: t("usersChart.totalUsers") },
    verified: { label: t("usersChart.verified"), color: "var(--chart-1)" },
    unverified: { label: t("usersChart.unverified"), color: "var(--chart-2)" },
    admins: { label: t("usersChart.admins"), color: "var(--chart-3)" },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full flex flex-col">
      <CardHeader className="pb-2 border-b border-border/40 shrink-0">
        <CardTitle className="text-base font-black flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span>{t("usersChart.title")}</span>
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          {t("usersChart.description")}
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
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              strokeWidth={5}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox?.cx}
                        y={viewBox?.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-black"
                        >
                          {formatNumber(user.total, locale)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs font-bold"
                        >
                          {t("usersChart.totalUsers")}
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
