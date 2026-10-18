"use client";

import { BookOpen, Clock, GraduationCap, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterStats() {
  const t = useTranslations("footer");

  const stats = [
    {
      icon: Users,
      value: "15K+",
      labelKey: "stats.students" as const,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: BookOpen,
      value: "120+",
      labelKey: "stats.courses" as const,
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10",
    },
    {
      icon: GraduationCap,
      value: "50+",
      labelKey: "stats.instructors" as const,
      color: "text-brand-cyan",
      bgColor: "bg-brand-cyan/10",
    },
    {
      icon: Clock,
      value: "800+",
      labelKey: "stats.hours" as const,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {stats.map((stat) => (
        <div
          key={stat.labelKey}
          className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
        >
          <div
            className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${stat.bgColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
          />

          <div className="relative flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {t(stat.labelKey)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}