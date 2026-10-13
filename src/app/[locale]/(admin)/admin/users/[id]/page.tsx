import { AdminUserDetailClient } from "@/components/admin/users/detail/AdminUserDetailClient";
import { UserDetailSkeleton } from "@/components/admin/users/detail/UserDetailSkeleton";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.users" });

  return {
    title: t("detail.title"),
  };
}

interface UserDetailSectionProps {
  paramsPromise: Promise<{ locale: string; id: string }>;
}

async function AdminUserDetailSection({
  paramsPromise,
}: UserDetailSectionProps) {
  const { locale, id } = await paramsPromise;
  setRequestLocale(locale);

  return <AdminUserDetailClient userId={id} />;
}

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  return (
    <Suspense fallback={<UserDetailSkeleton />}>
      <AdminUserDetailSection paramsPromise={params} />
    </Suspense>
  );
}
