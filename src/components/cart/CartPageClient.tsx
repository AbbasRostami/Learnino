"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/authStore";
import { useGuestCart } from "@/hooks/useGuestCart";
import {
  useCart,
  useClearCart,
  useRemoveFromCart,
  useSyncCart,
} from "@/services";
import { ShoppingBag, Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { CartItemCard } from "./CartItemCard";
import { CartSummarySidebar } from "./CartSummarySidebar";
import { EmptyCartState } from "./EmptyCartState";

export function CartPageClient() {
  const t = useTranslations("cart");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const prefersReducedMotion = useReducedMotion();

  const { data: cartData, isLoading } = useCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart({});
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart(
    {},
  );
  const { mutate: syncCart } = useSyncCart({});
  const {
    guestItems,
    guestCourseIds,
    removeGuestItem,
    clearGuestCart,
    isReady,
  } = useGuestCart();

  useEffect(() => {
    if (isAuthenticated && isReady && guestCourseIds.length > 0) {
      syncCart({ courseIds: guestCourseIds });
    }
  }, [isAuthenticated, isReady, guestCourseIds, syncCart]);

  const items = isAuthenticated
    ? (cartData?.data?.cart?.items ?? [])
    : guestItems;

  const guestSubtotal = guestItems.reduce(
    (acc, item) => acc + (item.price || 0),
    0,
  );
  const displayCart = isAuthenticated
    ? cartData?.data?.cart
    : {
        id: "guest-cart",
        totalItems: guestItems.length,
        subtotal: guestSubtotal,
        totalPayment: guestSubtotal,
        discount: null,
        items: guestItems,
      };

  const hasItems = items.length > 0;
  const shouldShowEmpty =
    !isLoading &&
    (isAuthenticated ? items.length === 0 : isReady && guestItems.length === 0);

  const handleClear = () => {
    if (isAuthenticated) {
      clearCart();
    } else {
      clearGuestCart();
    }
  };

  const handleRemoveItem = (courseId: string) => {
    if (isAuthenticated) {
      removeFromCart(courseId);
    } else {
      removeGuestItem(courseId);
    }
  };

  if (shouldShowEmpty) {
    return <EmptyCartState />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      <div
        className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-primary/10 via-brand-accent/5 to-transparent -z-10"
        aria-hidden="true"
      />

      <AppBreadcrumb className="mb-8" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {t("shoppingCart")}
            </h1>
            {hasItems && (
              <p className="text-xs text-muted-foreground font-semibold mt-1">
                {t("totalItems", {
                  count: displayCart?.totalItems ?? items.length,
                })}
              </p>
            )}
          </div>
        </div>

        {hasItems && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isClearing}
            className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("clearCart")}</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">
        <div className="flex flex-col gap-4 min-w-0">
          {isLoading && isAuthenticated
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-3xl bg-card/60 border border-border/50 animate-pulse"
                  aria-hidden="true"
                />
              ))
            : items.map((item, index) => (
                <motion.div
                  key={item.id || item.courseId}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 15 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                >
                  <CartItemCard
                    item={item}
                    onRemove={() => handleRemoveItem(item.courseId)}
                    isRemoving={isRemoving}
                  />
                </motion.div>
              ))}
        </div>

        <aside className="lg:sticky lg:top-24">
          <CartSummarySidebar cart={displayCart} />
        </aside>
      </div>
    </div>
  );
}
