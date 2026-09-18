"use client";

import { Carousel } from "@/components/shared/Carousel";
import { Link } from "@/i18n/routing";
import type { Course } from "@/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { CourseCard } from "./CourseCard";

interface FeaturedCoursesCarouselProps {
  courses: Course[];
}

export function FeaturedCoursesCarousel({
  courses,
}: FeaturedCoursesCarouselProps) {
  const t = useTranslations("course");

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
          href="/courses"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm shrink-0 me-2"
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
          key={course?.id}
          className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4 pe-4 pb-4"
        >
          <CourseCard course={course} priority={index === 0} />
        </div>
      ))}
    </Carousel>
  );
}
