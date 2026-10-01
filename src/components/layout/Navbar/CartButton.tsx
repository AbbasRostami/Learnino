"use client";

import { Link } from "@/i18n/routing";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/services";
import { useAuthStore } from "@/store/authStore";

export function CartButton() {
  const t = useTranslations("nav");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data } = useCart();

  const [guestCartCount, setGuestCartCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated && typeof window !== "undefined") {
      const updateGuestCount = () => {
        try {
          const localCart = JSON.parse(
            localStorage.getItem("learnino_guest_cart") || "[]",
          );
          setGuestCartCount(Array.isArray(localCart) ? localCart.length : 0);
        } catch {
          setGuestCartCount(0);
        }
      };

      updateGuestCount();

      window.addEventListener("storage", updateGuestCount);
      window.addEventListener("cart-updated", updateGuestCount);

      return () => {
        window.removeEventListener("storage", updateGuestCount);
        window.removeEventListener("cart-updated", updateGuestCount);
      };
    }
  }, [isAuthenticated]);

  const cartCount = isAuthenticated
    ? (data?.data?.cart?.totalItems ?? 0)
    : guestCartCount;

  return (
    <Link
      href="/cart"
      data-testid="nav-cart-btn"
      aria-label={t("cart")}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative h-10 w-10 cursor-pointer rounded-full transition-transform active:scale-95",
      )}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />

      {cartCount > 0 && (
        <span
          data-testid="nav-cart-count"
          className={cn(
            "absolute -top-1 -inset-e-1",
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1",
            "bg-brand-accent text-brand-accent-foreground",
            "text-[10px] font-bold shadow-md animate-in zoom-in-50 duration-200",
          )}
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}
