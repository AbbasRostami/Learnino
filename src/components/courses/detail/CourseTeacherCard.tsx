"use client";

import { Link } from "@/i18n/routing";
import type { Course } from "@/types";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CourseTeacherCardProps {
  teacher: NonNullable<Course["teacher"]>;
}

export function CourseTeacherCard({ teacher }: CourseTeacherCardProps) {
  const t = useTranslations("course");

  return (
    <section
      aria-labelledby="course-teacher-title"
      className="p-6 rounded-3xl border border-border/50 bg-linear-to-br from-primary/5 via-brand-accent/5 to-transparent shadow-sm"
    >
      <h2
        id="course-teacher-title"
        className="text-xl font-black text-foreground mb-6 flex items-center gap-2"
      >
        <span className="h-6 w-1 rounded-full bg-linear-to-b from-primary to-brand-accent" />
        {t("aboutTeacher")}
      </h2>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border-2 border-background bg-muted shadow-lg ring-2 ring-primary/20">
          {teacher?.avatar ? (
            <Image
              src={teacher?.avatar}
              alt={teacher?.name}
              fill
              quality={90}
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/10 text-primary text-3xl font-black">
              {teacher?.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold mb-2">
            <GraduationCap className="h-3 w-3" aria-hidden="true" />
            <span>{t("teacher")}</span>
          </div>

          <h3 className="text-xl font-black text-foreground mb-3">
            {teacher.name}
          </h3>

          <Link
            href={`/teachers/${teacher.slug}`}
            className="flex items-start gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4"
          >
            <span>{t("moreCourses")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
