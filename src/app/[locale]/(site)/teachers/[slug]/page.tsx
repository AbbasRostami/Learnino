import { TeacherProfileClient } from "@/components/teachers/TeacherProfileClient";
import { getTeacherBySlugServer } from "@/services/teacher/teachers";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const teacher = await getTeacherBySlugServer(locale, slug);

  if (!teacher) return { title: "مدرس یافت نشد" };

  return {
    title: `${teacher.name} | لرنینو`,
    description:
      teacher.bio?.slice(0, 155) || `مشاهده دوره‌ها و بیوگرافی ${teacher.name}`,
    openGraph: {
      title: `${teacher.name} | لرنینو`,
      description: teacher.bio?.slice(0, 155) || "",
      images: teacher.avatar ? [{ url: teacher.avatar }] : [],
    },
  };
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const teacher = await getTeacherBySlugServer(locale, slug);

  if (!teacher || !teacher.show) {
    notFound();
  }

  return (
    <main className="flex-1">
      <TeacherProfileClient slug={slug} initialTeacher={teacher} />
    </main>
  );
}
