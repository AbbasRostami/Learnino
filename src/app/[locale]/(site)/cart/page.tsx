import { CartPageClient } from "@/components/cart/CartPageClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: `${t("shoppingCart")} | لرنینو`,
    description: t("shoppingCart"),
    alternates: {
      canonical: `/${locale}/cart`,
      languages: { fa: "/fa/cart", en: "/en/cart" },
    },
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <CartPageClient />
    </main>
  );
}
