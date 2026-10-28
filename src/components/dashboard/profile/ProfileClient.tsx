"use client";

import { useProfile } from "@/services";
import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { UserCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { ProfileForm } from "./sections/ProfileForm";
import { ProfileHeroCard } from "./sections/ProfileHeroCard";

export function ProfileClient() {
  const t = useTranslations("dashboard");

  const { data, isLoading, isError, isFetching, refetch } = useProfile();
  const profile = data?.data?.profile;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <DashboardQueryError
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (!profile) {
    return (
      <DashboardQueryError
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <UserCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">
            {t("menu.profile")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("profileSubtitle")}
          </p>
        </div>
      </div>

      <ProfileHeroCard profile={profile} displayAvatar={profile?.avatar} />

      <ProfileForm profile={profile} />
    </div>
  );
}
