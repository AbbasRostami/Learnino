"use client";

import type { CartItem } from "@/types";
import { useEffect, useState } from "react";

const GUEST_CART_KEY = "learnino_guest_cart";

export function useGuestCart() {
  const [guestItems, setGuestItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadCart = () => {
      try {
        const stored = localStorage.getItem(GUEST_CART_KEY);
        const parsed = stored ? JSON.parse(stored) : [];

        const validItems: CartItem[] = parsed
          .map((item: any) => {
            if (typeof item === "string") {
              return {
                id: item,
                courseId: item,
                title: "دوره آموزشی",
                slug: "",
                price: 0,
                imageUrl: null,
                level: "BEGINNER",
                category: { id: "", name: "", slug: "" },
                addedAt: new Date().toISOString(),
              };
            }
            return {
              id: item.id || item.courseId,
              courseId: item.courseId || item.id,
              title: item.title || "",
              slug: item.slug || "",
              price: item.price || 0,
              imageUrl: item.imageUrl || null,
              level: item.level || "BEGINNER",
              category: item.category || { id: "", name: "", slug: "" },
              addedAt: item.addedAt || new Date().toISOString(),
            };
          })
          .filter(Boolean);

        setGuestItems(validItems);
      } catch {
        setGuestItems([]);
      } finally {
        setIsReady(true);
      }
    };

    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const guestCourseIds = guestItems.map((item) => item.courseId);

  const removeGuestItem = (courseId: string) => {
    const updated = guestItems.filter((item) => item.courseId !== courseId);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
    setGuestItems(updated);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const clearGuestCart = () => {
    localStorage.removeItem(GUEST_CART_KEY);
    setGuestItems([]);
    window.dispatchEvent(new Event("cart-updated"));
  };

  return {
    guestItems,
    guestCourseIds,
    removeGuestItem,
    clearGuestCart,
    isReady,
  };
}
