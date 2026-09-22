import { WalletClient } from "@/components/dashboard/wallet/WalletClient";
import { setRequestLocale } from "next-intl/server";

export default async function WalletPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WalletClient />;
}
