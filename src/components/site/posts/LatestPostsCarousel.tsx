"use client";

import { Carousel } from "@/components/shared/Carousel";
import { Link } from "@/i18n/routing";
import type { Post } from "@/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PostCard } from "./PostCard";

interface LatestPostsCarouselProps {
  posts: Post[];
}

export function LatestPostsCarousel({ posts }: LatestPostsCarouselProps) {
  const t = useTranslations("posts");

  if (!posts || posts?.length === 0) return null;

  return (
    <Carousel
      options={{
        slidesToScroll: 1,
        breakpoints: {
          "(min-width: 768px)": { slidesToScroll: 2 },
          "(min-width: 1024px)": { slidesToScroll: 3 },
        },
      }}
      actionContent={
        <Link
          href="/blog"
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
      {posts?.map((post, index) => (
        <div
          key={post?.id}
          className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pe-4 pb-4"
        >
          <PostCard post={post} priority={index === 0} />
        </div>
      ))}
    </Carousel>
  );
}
