"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAddToCart, useEnrollFreeCourse } from "@/services";
import { useAuthStore } from "@/store/authStore";
import type { Course } from "@/types";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Loader2,
  LucideIcon,
  PlayCircle,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface CoursePriceCardProps {
  course: Course;
  slug: string;
  isLoadingCourse?: boolean;
}

type GuestCartRawItem = string | { courseId?: string; id?: string };

export function CoursePriceCard({
  course,
  slug,
  isLoadingCourse = false,
}: CoursePriceCardProps) {
  const t = useTranslations("course");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { mutate: addToCart, isPending: isAdding } = useAddToCart({});
  const { mutate: enrollFree, isPending: isEnrolling } = useEnrollFreeCourse();

  const isFree = course?.price === 0;
  const isEnrolled = course?.isEnrolled;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      try {
        const storedCart = JSON.parse(
          localStorage.getItem("learnino_guest_cart") || "[]",
        );

        const guestItem = {
          id: course?.id,
          courseId: course?.id,
          title: course?.title,
          slug: course?.slug,
          price: course?.price,
          imageUrl: course?.imageUrl,
          level: course?.level,
          category: course?.category,
          addedAt: new Date().toISOString(),
        };

        const exists = storedCart?.some((item: GuestCartRawItem) =>
          typeof item === "string"
            ? item === course?.id
            : item.courseId === course?.id,
        );

        if (!exists) {
          storedCart.push(guestItem);
          localStorage.setItem(
            "learnino_guest_cart",
            JSON.stringify(storedCart),
          );
          window.dispatchEvent(new Event("cart-updated"));
          toast.success(tCart("addSuccess"));
        } else {
          toast.info(tCart("alreadyInCart"));
        }
      } catch {
        toast.error(tCart("errorGeneral"));
      }
      return;
    }

    addToCart({ courseId: course.id });
  };

  const handleEnrollFree = () => {
    if (!isAuthenticated) {
      toast.info(tCart("loginRequired"));
      return;
    }
    enrollFree(slug);
  };

  const isCheckingAuthStatus =
    isAuthenticated && isLoadingCourse && !isEnrolled;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl dark:shadow-none">
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative p-6">
        <div className="mb-6 pb-6 border-b border-dashed border-border/60">
          {isFree ? (
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {t("free")}
              </div>
            </div>
          ) : (
            <div className="flex items-baseline gap-2" dir="ltr">
              <span className="text-4xl font-black text-foreground">
                {new Intl.NumberFormat(
                  locale === "fa" ? "fa-IR" : "en-US",
                ).format(course.price)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {t("currency")}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {isCheckingAuthStatus ? (
            <Button
              disabled
              size="lg"
              className="w-full rounded-2xl h-12 gap-2 text-xs font-bold"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>در حال بررسی وضعیت...</span>
            </Button>
          ) : isEnrolled ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-black">
                  شما دانشجوی این دوره هستید
                </span>
              </div>
              <Link
                data-testid="start-learning-link"
                href="/dashboard/my-courses"
                className="w-full"
              >
                <Button
                  size="lg"
                  className="w-full rounded-2xl h-12 gap-2 shadow-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer font-bold"
                >
                  <PlayCircle className="h-5 w-5" />
                  <span>{t("startLearning")}</span>
                </Button>
              </Link>
            </div>
          ) : isFree ? (
            <Button
              size="lg"
              data-testid="enroll-free-btn"
              onClick={handleEnrollFree}
              disabled={isEnrolling}
              className="w-full rounded-2xl h-12 gap-2 shadow-emerald-500/20 shadow-lg hover:shadow-xl transition-all bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer font-bold"
            >
              {isEnrolling ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
              <span>{t("enrollFree")}</span>
            </Button>
          ) : (
            <Button
              size="lg"
              data-testid="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full rounded-2xl h-12 gap-2 cursor-pointer shadow-primary/20 shadow-lg hover:shadow-xl transition-all font-bold"
            >
              {isAdding ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
              <span>{t("addToCart")}</span>
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <QuickInfo
            icon={BookOpen}
            label={t("level")}
            value={t(`levels.${course?.level}`)}
            iconClass="text-primary bg-primary/10"
          />
          <QuickInfo
            icon={Award}
            label={t("features.certificate")}
            value="✓"
            iconClass="text-brand-accent bg-brand-accent/10"
          />
        </div>
      </div>
    </div>
  );
}

interface QuickInfoProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClass: string;
}

function QuickInfo({ icon: Icon, label, value, iconClass }: QuickInfoProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/40">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl",
            iconClass,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-black text-foreground">{value}</span>
    </div>
  );
}
