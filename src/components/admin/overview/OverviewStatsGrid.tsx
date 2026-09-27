"use client";

import { cn } from "@/lib/utils";
import type {
  AdminCommentStats,
  AdminCourseStats,
  AdminDiscountStats,
  AdminEnrollmentStats,
  AdminOrderStats,
  AdminPostStats,
  AdminRevenueStats,
  AdminUserStats,
} from "@/types";
import { formatNumber } from "@/utils/formatters";
import {
  BookOpen,
  DollarSign,
  FileText,
  GraduationCap,
  MessageCircle,
  Package,
  Tag,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

type OverviewT = ReturnType<typeof useTranslations<"admin.overview">>;

interface OverviewStatsGridProps {
  revenue: AdminRevenueStats;
  user: AdminUserStats;
  order: AdminOrderStats;
  course: AdminCourseStats;
  post: AdminPostStats;
  comment: AdminCommentStats;
  enrollment: AdminEnrollmentStats;
  discount: AdminDiscountStats;
  locale: string;
  t: OverviewT;
}

export function OverviewStatsGrid({
  revenue,
  user,
  order,
  course,
  post,
  comment,
  enrollment,
  discount,
  locale,
  t,
}: OverviewStatsGridProps) {
  const mainCards = [
    {
      icon: DollarSign,
      title: t("stats.totalRevenue"),
      value: `${formatNumber(revenue?.sales?.total, locale)} RLS`,
      subText: t("statsSub.thisMonth", {
        value: `${formatNumber(revenue?.sales?.thisMonth, locale)} RLS`,
      }),
      color: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
    },
    {
      icon: Wallet,
      title: t("stats.walletRevenue"),
      value: `${formatNumber(revenue?.walletCharges?.total, locale)} RLS`,
      subText: t("statsSub.thisMonth", {
        value: `${formatNumber(revenue?.walletCharges?.thisMonth, locale)} RLS`,
      }),
      color: "from-amber-500 to-orange-600 shadow-amber-500/20",
    },
    {
      icon: Users,
      title: t("stats.totalUsers"),
      value: formatNumber(user?.total, locale),
      subText: t("statsSub.thisWeek", {
        value: formatNumber(user?.newThisWeek, locale),
      }),
      color: "from-primary to-indigo-600 shadow-primary/20",
    },
    {
      icon: Package,
      title: t("stats.totalOrders"),
      value: formatNumber(order?.total, locale),
      subText: t("statsSub.paid", {
        value: formatNumber(order?.paid, locale),
      }),
      color: "from-brand-accent to-purple-600 shadow-brand-accent/20",
    },
  ];

  const contentCards = [
    {
      icon: GraduationCap,
      title: t("stats.totalEnrollments"),
      value: formatNumber(enrollment.total, locale),
      subText: t("statsSub.thisWeek", {
        value: formatNumber(enrollment.thisWeek, locale),
      }),
      color: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    },
    {
      icon: BookOpen,
      title: t("stats.totalCourses"),
      value: formatNumber(course.total, locale),
      subText: t("statsSub.published", {
        value: formatNumber(course.published, locale),
      }),
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: FileText,
      title: t("stats.totalPosts"),
      value: formatNumber(post.total, locale),
      subText: t("statsSub.published", {
        value: formatNumber(post.published, locale),
      }),
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: MessageCircle,
      title: t("stats.totalComments"),
      value: formatNumber(comment.total, locale),
      subText: t("statsSub.pending", {
        value: formatNumber(comment.pending, locale),
      }),
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
    {
      icon: Tag,
      title: t("stats.totalDiscounts"),
      value: formatNumber(discount.total, locale),
      subText: t("statsSub.active", {
        value: formatNumber(discount.active, locale),
      }),
      color: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mainCards.map((c, i) => (
          <div
            key={i}
            className="group relative overflow-hidden p-6 rounded-[2rem] border border-white/10 bg-card shadow-xl transition-all hover:-translate-y-1"
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 bg-linear-to-br opacity-10 blur-3xl -mr-10 -mt-10",
                c.color,
              )}
            />
            <div className="relative flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {c.title}
                </p>
                <h3 className="text-2xl font-black text-foreground font-mono tracking-tight">
                  {c.value}
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground/80">
                  {c.subText}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg",
                  c.color,
                )}
              >
                <c.icon className="h-7 w-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {contentCards.map((c, i) => (
          <div
            key={i}
            className="group p-4 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-xs flex flex-col gap-3 hover:border-primary/40 transition-all"
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                c.color,
              )}
            >
              <c.icon className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                {c.title}
              </p>
              <h4 className="text-lg font-black text-foreground font-mono">
                {c.value}
              </h4>
              <p className="text-[9px] font-bold text-muted-foreground/70">
                {c.subText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
