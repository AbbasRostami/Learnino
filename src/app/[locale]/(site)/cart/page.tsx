import { CartPageClient } from "@/components/cart/CartPageClient";
import type { Locale } from "@/lib/seo";
import { PRIVATE_ROBOTS } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  return {
    title: isFa ? "سبد خرید" : "Shopping Cart",
    description: isFa ? "سبد خرید شما" : "Your shopping cart",
    robots: PRIVATE_ROBOTS,
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <CartPageClient />
    </main>
  );
}
