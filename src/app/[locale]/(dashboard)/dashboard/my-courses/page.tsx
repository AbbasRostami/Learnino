import { MyCoursesClient } from "@/components/dashboard/my-courses/MyCoursesClient";
import { setRequestLocale } from "next-intl/server";

export default async function MyCoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MyCoursesClient />;
}
