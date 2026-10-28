"use client";

import { useProfile, useProfileOverview } from "@/services";
import { OverviewGreeting } from "./OverviewGreeting";
import { OverviewQuickActions } from "./OverviewQuickActions";
import { OverviewRecentCourses } from "./OverviewRecentCourses";
import { OverviewRecentOrders } from "./OverviewRecentOrders";
import { OverviewStatsGrid } from "./OverviewStatsGrid";
import { OverviewWalletCard } from "./OverviewWalletCard";

export function DashboardOverview() {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    isFetching: isProfileFetching,
    refetch: refetchProfile,
  } = useProfile();
  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    isFetching: isOverviewFetching,
    refetch: refetchOverview,
  } = useProfileOverview();

  const profile = profileData?.data?.profile;
  const overview = overviewData?.data?.overview;

  return (
    <div className="flex flex-col gap-6">
      <OverviewGreeting
        profile={profile}
        isLoading={isProfileLoading}
        isError={isProfileError}
        isRetrying={isProfileFetching}
        onRetry={() => void refetchProfile()}
      />

      <OverviewStatsGrid
        overview={overview}
        isLoading={isOverviewLoading}
        isError={isOverviewError}
        isRetrying={isOverviewFetching}
        onRetry={() => void refetchOverview()}
      />

      <OverviewWalletCard
        balance={overview?.wallet?.balance}
        isLoading={isOverviewLoading}
        isError={isOverviewError}
        isRetrying={isOverviewFetching}
        onRetry={() => void refetchOverview()}
      />

      <OverviewQuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewRecentCourses />
        <OverviewRecentOrders />
      </div>
    </div>
  );
}
