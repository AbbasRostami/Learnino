"use client";

import { Link } from "@/i18n/routing";
import type { TeacherListItem } from "@/types";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface TeacherCardProps {
  teacher: TeacherListItem;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const t = useTranslations("teachers");

  return (
    <Link
      href={`/teachers/${teacher?.slug}`}
      className="group relative flex flex-col items-center gap-4 p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300 h-full overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div
        className="absolute -top-16 inset-s-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-linear-to-br from-primary/20 to-brand-accent/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-lg bg-linear-to-br from-primary/20 to-brand-accent/20">
          {teacher?.avatar ? (
            <Image
              src={teacher?.avatar}
              alt={teacher?.name}
              fill
              sizes="105px"
              className="object-cover transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary text-3xl font-black">
              {teacher?.name?.charAt(0)}
            </div>
          )}
        </div>

        <div className="absolute -bottom-1 -inset-e-1 flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 shadow-lg">
          <BookOpen className="h-3 w-3" aria-hidden="true" />
          <span>{teacher?.coursesCount}</span>
        </div>
      </div>

      <div className="text-center relative z-10 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
          {teacher?.name}
        </h3>
        {teacher?.bio && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {teacher?.bio}
          </p>
        )}
      </div>

      <div className="mt-auto pt-3 border-t border-dashed border-border/60 w-full text-center">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
          {t("coursesCount", { count: teacher?.coursesCount })}
        </span>
      </div>
    </Link>
  );
}
