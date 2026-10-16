"use client";

import { useAdminOverview, useProfile } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import { ReadOnlyBanner } from "../shared";
import { AdminOverviewSkeleton } from "./AdminOverviewSkeleton";
import { OverviewExpiringDiscounts } from "./OverviewExpiringDiscounts";
import { OverviewOrdersChart } from "./OverviewOrdersChart";
import { OverviewPendingComments } from "./OverviewPendingComments";
import { OverviewRevenueChart } from "./OverviewRevenueChart";
import { OverviewStatsGrid } from "./OverviewStatsGrid";
import { OverviewTopCourses } from "./OverviewTopCourses";
import { OverviewTopDiscounts } from "./OverviewTopDiscounts";
import { OverviewUsersChart } from "./OverviewUsersChart";
import { OverviewWelcomeBanner } from "./OverviewWelcomeBanner";

export function AdminOverviewClient() {
  const t = useTranslations("admin.overview");
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
      <ReadOnlyBanner />

      <OverviewWelcomeBanner
        title={t("welcomeBack", { name: userName })}
        subtitle={t("welcomeSubtitle")}
      />

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
