"use client";

import { useAdminOverview, useProfile } from "@/services";
import { Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AdminOverviewSkeleton } from "./AdminOverviewSkeleton";
import { OverviewExpiringDiscounts } from "./OverviewExpiringDiscounts";
import { OverviewOrdersChart } from "./OverviewOrdersChart";
import { OverviewPendingComments } from "./OverviewPendingComments";
import { OverviewRevenueChart } from "./OverviewRevenueChart";
import { OverviewStatsGrid } from "./OverviewStatsGrid";
import { OverviewTopCourses } from "./OverviewTopCourses";
import { OverviewTopDiscounts } from "./OverviewTopDiscounts";
import { OverviewUsersChart } from "./OverviewUsersChart";

export function AdminOverviewClient() {
  const t = useTranslations("admin.overview");
  const tAdmin = useTranslations("admin");
  const locale = useLocale();

  const { data: profileData } = useProfile();
  const profile = profileData?.data?.profile;
  const userName = profile?.name || profile?.email?.split("@")?.[0] || "Admin";

  const { data: overviewData, isLoading } = useAdminOverview();
  const data = overviewData?.data;

  if (isLoading || !data) {
    return <AdminOverviewSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-6 sm:p-8 shadow-lg">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="relative flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-black">
            <Sparkles className="h-3 w-3" />
            <span>{tAdmin("badge")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {t("welcomeBack", { name: userName })}
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            {t("welcomeSubtitle")}
          </p>
        </div>
      </div>

      <OverviewStatsGrid
        revenue={data?.revenue}
        user={data?.user}
        order={data?.order}
        course={data?.course}
        post={data?.post}
        comment={data?.comment}
        enrollment={data?.enrollment}
        discount={data?.discount}
        locale={locale}
        t={t}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewRevenueChart revenue={data?.revenue} t={t} />
        </div>
        <div className="lg:col-span-1">
          <OverviewOrdersChart order={data?.order} locale={locale} t={t} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OverviewUsersChart user={data?.user} locale={locale} t={t} />
        </div>
        <div className="lg:col-span-2">
          <OverviewPendingComments
            comments={data?.comment?.latestPending}
            locale={locale}
            t={t}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewTopCourses
          topCourses={data?.enrollment?.topCourses}
          locale={locale}
          t={t}
        />
        <OverviewTopDiscounts
          discounts={data?.discount?.topUsed}
          locale={locale}
          t={t}
        />
      </div>

      {data?.discount?.expiringThisWeek?.length > 0 && (
        <OverviewExpiringDiscounts
          discounts={data?.discount?.expiringThisWeek}
          locale={locale}
          t={t}
        />
      )}
    </div>
  );
}
