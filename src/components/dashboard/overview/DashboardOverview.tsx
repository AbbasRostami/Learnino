"use client";

import { useProfile, useProfileOverview } from "@/services";
import { OverviewGreeting } from "./OverviewGreeting";
import { OverviewQuickActions } from "./OverviewQuickActions";
import { OverviewRecentCourses } from "./OverviewRecentCourses";
import { OverviewRecentOrders } from "./OverviewRecentOrders";
import { OverviewStatsGrid } from "./OverviewStatsGrid";
import { OverviewWalletCard } from "./OverviewWalletCard";

export function DashboardOverview() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: overviewData, isLoading: isOverviewLoading } =
    useProfileOverview();

  const profile = profileData?.data?.profile;
  const overview = overviewData?.data?.overview;

  return (
    <div className="flex flex-col gap-6">
      <OverviewGreeting profile={profile} isLoading={isProfileLoading} />

      <OverviewStatsGrid overview={overview} isLoading={isOverviewLoading} />

      <OverviewWalletCard />

      <OverviewQuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewRecentCourses />
        <OverviewRecentOrders />
      </div>
    </div>
  );
}
