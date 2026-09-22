import { FavoritesClient } from "@/components/dashboard/favorites/FavoritesClient";
import { setRequestLocale } from "next-intl/server";

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FavoritesClient />;
}
