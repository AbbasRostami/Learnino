"use client";

import { Carousel } from "@/components/shared/Carousel";
import type { CategoryWithCount } from "@/types";
import { CategoryCard } from "./CategoryCard";

interface CategoriesCarouselProps {
  categories: CategoryWithCount[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  if (!categories || categories?.length === 0) return null;

  return (
    <Carousel
      options={{
        slidesToScroll: 1,
        breakpoints: {
          "(min-width: 640px)": { slidesToScroll: 2 },
          "(min-width: 1024px)": { slidesToScroll: 3 },
        },
      }}
    >
      {categories?.map((category) => (
        <div
          key={category?.id}
          className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pe-4"
        >
          <CategoryCard category={category} />
        </div>
      ))}
    </Carousel>
  );
}
