"use client";

import { Carousel } from "@/components/shared/Carousel";
import { CourseCard } from "@/components/site/courses/CourseCard";
import { Link } from "@/i18n/routing";
import type { Course } from "@/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface FreeCoursesCarouselProps {
  courses: Course[];
}

export function FreeCoursesCarousel({ courses }: FreeCoursesCarouselProps) {
  const t = useTranslations("freeCourses");

  if (!courses || courses?.length === 0) return null;

  return (
    <Carousel
      options={{
        slidesToScroll: 1,
        breakpoints: {
          "(min-width: 640px)": { slidesToScroll: 2 },
          "(min-width: 1024px)": { slidesToScroll: 3 },
          "(min-width: 1280px)": { slidesToScroll: 4 },
        },
      }}
      actionContent={
        <Link
          href="/courses?maxPrice=0"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-bold text-foreground hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm shrink-0 me-2"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      }
    >
      {courses?.map((course, index) => (
        <div
          key={course.id}
          className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4 pe-4 pb-4"
        >
          <CourseCard course={course} priority={index === 0} />
        </div>
      ))}
    </Carousel>
  );
}
