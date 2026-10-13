"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminCancelOrder, useAdminOrderDetails } from "@/services";
import { formatNumber } from "@/utils/formatters";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Mail,
  Package,
  Percent,
  ShoppingBag,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { OrderInfoCards } from "./OrderInfoCards";

interface AdminOrderDetailClientProps {
  orderId: string;
}

export function AdminOrderDetailClient({
  orderId,
}: AdminOrderDetailClientProps) {
  const t = useTranslations("admin.orders");
  const locale = useLocale();
  const [cancelOpen, setCancelOpen] = useState(false);

  const { data, isLoading } = useAdminOrderDetails(orderId);
  const order = data?.data?.order;

  const { mutate: cancelOrder, isPending: isCancelling } = useAdminCancelOrder({
    onSuccessCallback: () => setCancelOpen(false),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
        <Skeleton className="h-16 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-sm font-bold text-muted-foreground">
          {t("detail.orderNotFound")}
        </p>
        <Link
          href="/admin/orders"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-10 gap-2 cursor-pointer",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("actions.backToList")}</span>
        </Link>
      </div>
    );
  }

  const currencyText = locale === "fa" ? "تومان" : "Toman";
  const displayName =
    order?.user?.name || order?.user?.email?.split("@")?.[0] || "—";
  const initial = displayName.charAt(0).toUpperCase();
  const isPending = order?.status === "PENDING";
  const discountAmt = order?.discountAmount ?? 0;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("detail.title")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {t("detail.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPending && (
            <Button
              variant="destructive"
              onClick={() => setCancelOpen(true)}
              className="rounded-xl h-11 gap-2 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white"
            >
              <XCircle className="h-4 w-4" />
              <span>{t("actions.cancelOrder")}</span>
            </Button>
          )}
          <Link
            href="/admin/orders"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl h-11 gap-2 cursor-pointer shadow-xs",
            )}
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("actions.backToList")}</span>
          </Link>
        </div>
      </div>

      {/* کارت‌های خلاصه وضعیت ۴گانه */}
      <OrderInfoCards order={order} t={t} locale={locale} />

      {/* مشخصات کاربر و خلاصه مالی */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 text-sm font-black text-foreground border-b border-border/40 pb-3 mb-4">
            <User className="h-4 w-4 text-primary" />
            <span>{t("detail.userInfo")}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-background shadow-md ring-2 ring-primary/20">
              <AvatarImage src={order?.user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-lg">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-base font-black text-foreground truncate">
                {displayName}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate" dir="ltr">
                  {order?.user?.email}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/admin/users/${order?.user?.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-xl h-9 w-full gap-1.5 text-xs font-bold cursor-pointer",
            )}
          >
            <span>{t("detail.viewUserProfile")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-90" />
          </Link>
        </div>

        <div className="p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 text-sm font-black text-foreground border-b border-border/40 pb-3 mb-4">
            <CreditCard className="h-4 w-4 text-brand-accent" />
            <span>{t("detail.financialSummary")}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-bold flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" />
                {t("detail.subtotal")}
              </span>
              <span className="font-black text-foreground">
                {formatNumber(
                  order?.subtotal ?? order?.totalAmount ?? 0,
                  locale,
                )}{" "}
                {currencyText}
              </span>
            </div>

            {discountAmt > 0 && (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-bold flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-emerald-500" />
                    {t("detail.discountAmount")}
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    -{formatNumber(discountAmt, locale)} {currencyText}
                  </span>
                </div>

                {order?.discountCode && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-bold flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-primary" />
                      {t("detail.discountCode")}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-black text-xs tracking-wider">
                      {order.discountCode}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center justify-between text-sm pt-3 border-t border-border/40">
              <span className="text-foreground font-black">
                {t("detail.totalAmount")}
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">
                {formatNumber(order?.totalAmount ?? 0, locale)} {currencyText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* آیتم‌های خریداری‌شده */}
      <div className="p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 text-sm font-black text-foreground border-b border-border/40 pb-3 mb-4">
          <Package className="h-4 w-4 text-primary" />
          <span>{t("detail.purchasedItems")}</span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
            {formatNumber(order?.items?.length ?? 0, locale)}
          </span>
        </div>

        {order?.items?.length ? (
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div
                key={item?.id}
                className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-border/40 bg-background/80 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                    {item?.courseImageUrl ? (
                      <Image
                        src={item?.courseImageUrl}
                        alt={item?.courseTitle || ""}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <BookOpen className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-black text-foreground truncate">
                      {item?.courseTitle}
                    </span>
                    <span
                      className="text-xs text-muted-foreground truncate"
                      dir="ltr"
                    >
                      /{item?.courseSlug}
                    </span>
                  </div>
                </div>

                <span className="text-sm font-black text-foreground shrink-0">
                  {item?.price === 0
                    ? t("free")
                    : `${formatNumber(item?.price ?? 0, locale)} ${currencyText}`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-muted-foreground font-semibold">
            {t("detail.noItems")}
          </div>
        )}
      </div>

      <AdminConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        variant="destructive"
        icon={XCircle}
        title={t("confirmCancel.title")}
        confirmLabel={t("confirmCancel.confirm")}
        cancelLabel={t("confirmCancel.cancel")}
        isPending={isCancelling}
        onConfirm={() => cancelOrder(orderId)}
        description={
          <>
            {t("confirmCancel.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs">
              #{order?.id}
            </span>
          </>
        }
      />
    </div>
  );
}
