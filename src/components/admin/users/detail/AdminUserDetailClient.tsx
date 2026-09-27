"use client";

import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import {
  AdminStatsGrid,
  type StatCardConfig,
} from "@/components/admin/shared/AdminStatsGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useBanUser, useUserDetails } from "@/services";
import { formatRelativeTime } from "@/utils/formatters";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Heart,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Shield,
  ShieldCheck,
  ShieldOff,
  Star,
  ThumbsUp,
  UserCheck,
  UserX,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserDetailSkeleton } from "./UserDetailSkeleton";

interface AdminUserDetailClientProps {
  userId: string;
}

export function AdminUserDetailClient({ userId }: AdminUserDetailClientProps) {
  const t = useTranslations("admin.users");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [banDialogOpen, setBanDialogOpen] = useState(false);

  const { data, isLoading } = useUserDetails(userId);
  const user = data?.data?.user;

  const { mutate: banUser, isPending: isBanPending } = useBanUser({
    onSuccessCallback: () => setBanDialogOpen(false),
  });

  if (isLoading) return <UserDetailSkeleton />;

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-sm font-bold text-muted-foreground">
          {t("detail.userNotFound")}
        </p>
      </div>
    );
  }

  const displayName =
    user?.name || user?.email?.split("@")?.[0] || t("detail.noName");
  const avatarInitial = (user?.name || user?.email || "?")
    .charAt(0)
    ?.toUpperCase();

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);

  const statsCards: StatCardConfig[] = [
    {
      key: "enrollments",
      label: t("stats.enrollments"),
      value: user?.stats?.enrollments ?? 0,
      icon: BookOpen,
      color: "from-primary to-indigo-500",
      bgHover: "from-primary/10 to-transparent",
    },
    {
      key: "orders",
      label: t("stats.orders"),
      value: user?.stats?.orders ?? 0,
      icon: Package,
      color: "from-brand-accent to-purple-500",
      bgHover: "from-brand-accent/10 to-transparent",
    },
    {
      key: "comments",
      label: t("stats.comments"),
      value: user?.stats?.comments ?? 0,
      icon: MessageCircle,
      color: "from-brand-cyan to-cyan-500",
      bgHover: "from-brand-cyan/10 to-transparent",
    },
    {
      key: "favoriteCourses",
      label: t("stats.favoriteCourses"),
      value: user?.stats?.favoriteCourses ?? 0,
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bgHover: "from-rose-500/10 to-transparent",
    },
    {
      key: "favoritePosts",
      label: t("stats.favoritePosts"),
      value: user?.stats?.favoritePosts ?? 0,
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgHover: "from-amber-500/10 to-transparent",
    },
    {
      key: "reactions",
      label: t("stats.reactions"),
      value: user?.stats?.reactions ?? 0,
      icon: ThumbsUp,
      color: "from-emerald-500 to-teal-500",
      bgHover: "from-emerald-500/10 to-transparent",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/users"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-xl h-9 gap-2 cursor-pointer",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("detail.back")}</span>
        </Link>
      </div>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-6 sm:p-8 shadow-lg"
      >
        <div
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-brand-accent/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative shrink-0">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl ring-2 ring-primary/20">
              <AvatarImage src={user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white text-3xl font-black">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            {user?.role === "ADMIN" && (
              <div className="absolute -bottom-1 -inset-e-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md">
                <Shield className="h-4 w-4 text-white" strokeWidth={3} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 text-center md:text-start">
            <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                {displayName}
              </h1>
              {user?.role === "ADMIN" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-[10px] font-black">
                  <ShieldCheck className="h-3 w-3" />
                  <span>ADMIN</span>
                </span>
              )}
              {user?.isVerified ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black">
                  <UserCheck className="h-3 w-3" />
                  <span>{t("detail.verified")}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-black">
                  <UserX className="h-3 w-3" />
                  <span>{t("detail.unverified")}</span>
                </span>
              )}
            </div>

            <p
              className="text-xs text-muted-foreground mb-4 font-mono"
              dir="ltr"
            >
              #{user?.id}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-background/60 border border-border/40">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span
                  className="font-semibold text-foreground truncate"
                  dir="ltr"
                >
                  {user?.email}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-background/60 border border-border/40">
                <Phone className="h-4 w-4 text-brand-accent shrink-0" />
                <span className="font-mono text-foreground" dir="ltr">
                  {user?.phone || t("detail.noPhone")}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-background/60 border border-border/40">
                <Calendar className="h-4 w-4 text-brand-cyan shrink-0" />
                <span
                  className="font-semibold text-foreground"
                  suppressHydrationWarning
                >
                  {t("detail.createdAt")}: {formatRelativeTime(user.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-background/60 border border-border/40">
                <Wallet className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="font-black text-foreground" dir="ltr">
                  {formatPrice(user?.walletBalance ?? 0)}
                </span>
              </div>
            </div>
          </div>

          {user.role !== "ADMIN" && (
            <div className="shrink-0">
              <Button
                onClick={() => setBanDialogOpen(true)}
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "rounded-xl h-11 gap-2 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white",
                )}
              >
                <ShieldOff className="h-4 w-4" />
                <span>{t("actions.banUser")}</span>
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <div>
        <h2 className="text-sm font-black text-foreground mb-4 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-linear-to-b from-primary to-brand-accent" />
          {t("detail.activityStats")}
        </h2>

        <AdminStatsGrid stats={statsCards} columns={6} />
      </div>

      <AdminConfirmDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        variant="destructive"
        icon={ShieldOff}
        title={t("confirmBan.title")}
        confirmLabel={t("confirmBan.confirm")}
        cancelLabel={t("confirmBan.cancel")}
        isPending={isBanPending}
        onConfirm={() => banUser(user?.id)}
        description={
          <>
            {t("confirmBan.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {displayName}
            </span>
          </>
        }
      />
    </div>
  );
}
