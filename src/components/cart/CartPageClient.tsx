"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useGuestCart } from "@/hooks/useGuestCart";
import { useCart, useClearCart, useRemoveFromCart } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  CartItemSkeleton,
  CartSidebarSkeleton,
} from "../skeleton/CartSkeleton";
import { CartItemCard } from "./CartItemCard";
import { CartSummarySidebar } from "./CartSummarySidebar";
import { EmptyCartState } from "./EmptyCartState";

export function CartPageClient() {
  const t = useTranslations("cart");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: cartData, isLoading } = useCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart({});
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { guestItems, removeGuestItem, clearGuestCart, isReady } =
    useGuestCart();

  const items = isAuthenticated
    ? (cartData?.data?.cart?.items ?? [])
    : guestItems;

  const guestSubtotal = guestItems.reduce(
    (acc, item) => acc + (item?.price || 0),
    0,
  );
  const displayCart = isAuthenticated
    ? cartData?.data?.cart
    : {
        id: "guest-cart",
        totalItems: guestItems?.length,
        subtotal: guestSubtotal,
        totalAmount: guestSubtotal,
        totalPayment: guestSubtotal,
        discount: null,
        items: guestItems,
      };

  const hasItems = items?.length > 0;

  const shouldShowEmpty =
    !isLoading &&
    (isAuthenticated
      ? items.length === 0
      : isReady && guestItems?.length === 0);

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

  const isFetchingData = isLoading && isAuthenticated;

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
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
            {hasItems && !isFetchingData && (
              <p className="text-xs text-muted-foreground font-semibold mt-1">
                {t("totalItems", {
                  count: displayCart?.totalItems ?? items.length,
                })}
              </p>
            )}
          </div>
        </div>

        {hasItems && !isFetchingData && (
          <Button
            variant="ghost"
            size="sm"
            data-testid="clear-cart-btn"
            onClick={handleClear}
            disabled={isClearing}
            className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("clearCart")}</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">
        <div className="flex flex-col gap-4 min-w-0">
          {isFetchingData
            ? Array.from({ length: 2 }).map((_, i) => (
                <CartItemSkeleton key={i} />
              ))
            : items?.map((item) => (
                <CartItemCard
                  key={item?.id}
                  item={item}
                  onRemove={() => handleRemoveItem(item?.courseId)}
                  isRemoving={isRemoving}
                />
              ))}
        </div>

        <aside className="lg:sticky lg:top-24">
          {isFetchingData ? (
            <CartSidebarSkeleton />
          ) : (
            <CartSummarySidebar cart={displayCart} />
          )}
        </aside>
      </div>
    </div>
  );
}
