"use client";

import { AdminStatsGrid, type StatCardConfig } from "@/components/admin/shared";
import { useAdminUsersStats } from "@/services";
import { Shield, UserCheck, UserPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export function UsersStatsSection() {
  const t = useTranslations("admin.users.overviewStats");

  const { data, isLoading } = useAdminUsersStats();
  const stats = data?.data?.user;

  const cards: StatCardConfig[] = [
    {
      key: "total",
      label: t("total"),
      value: stats?.total ?? 0,
      subLabel: t("totalSubtitle", { count: stats?.regular ?? 0 }),
      icon: Users,
      color: "from-primary to-indigo-500",
      bgHover: "from-primary/10 to-transparent",
    },
    {
      key: "verified",
      label: t("verified"),
      value: stats?.verified ?? 0,
      subLabel: t("verifiedSubtitle", { count: stats?.unverified ?? 0 }),
      icon: UserCheck,
      color: "from-emerald-500 to-teal-500",
      bgHover: "from-emerald-500/10 to-transparent",
    },
    {
      key: "newThisWeek",
      label: t("newThisWeek"),
      value: stats?.newThisWeek ?? 0,
      subLabel: t("newThisWeekSubtitle", { count: stats?.newThisMonth ?? 0 }),
      icon: UserPlus,
      color: "from-brand-accent to-purple-500",
      bgHover: "from-brand-accent/10 to-transparent",
    },
    {
      key: "admins",
      label: t("admins"),
      value: stats?.admins ?? 0,
      icon: Shield,
      color: "from-amber-500 to-orange-500",
      bgHover: "from-amber-500/10 to-transparent",
    },
  ];

  return <AdminStatsGrid stats={cards} isLoading={isLoading} columns={4} />;
}
