"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TopEnrolledCourse } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { BookOpen, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type OverviewT = ReturnType<typeof useTranslations<"admin.overview">>;

interface OverviewTopCoursesProps {
  topCourses: TopEnrolledCourse[];
  locale: string;
  t: OverviewT;
}

export function OverviewTopCourses({
  topCourses,
  locale,
  t,
}: OverviewTopCoursesProps) {
  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full">
      <CardHeader className="pb-3 border-b border-border/40">
        <CardTitle className="text-sm font-black flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span>{t("topCourses.title")}</span>
        </CardTitle>
        <CardDescription className="text-[11px] mt-0.5">
          {t("topCourses.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {topCourses?.length ? (
          <div className="flex flex-col gap-2.5">
            {topCourses.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-2xl border border-border/40 bg-background/80 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                    {c.imageUrl ? (
                      <Image
                        src={c.imageUrl}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <BookOpen className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-black text-foreground truncate">
                    {c.title}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black shrink-0">
                  <GraduationCap className="h-3 w-3" />
                  <span>
                    {t("topCourses.enrollments", {
                      count: formatNumber(c?.enrollments, locale),
                    })}
                  </span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
            {t("topCourses.noCourses")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
