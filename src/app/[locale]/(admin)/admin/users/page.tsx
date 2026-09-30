import { AdminTableSkeleton } from "@/components/admin/shared/AdminTableSkeleton"; // 🎯 مطمئن شوید مسیر ایمپورت اسکلتون شما صحیح است
import { AdminUsersClient } from "@/components/admin/users/list/AdminUsersClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.users" });

  return {
    title: t("pageTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-card">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <AdminTableSkeleton columnCount={5} rowCount={8} />
              </tbody>
            </table>
          </div>
        </div>
      }
    >
      <AdminUsersClient />
    </Suspense>
  );
}
