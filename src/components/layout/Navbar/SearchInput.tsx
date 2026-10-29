"use client";

import { Link, useRouter } from "@/i18n/routing";
import { ArrowUpLeft, BookOpen, FileText, Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { QueryErrorState } from "@/components/shared/QueryErrorState";
import { useDebouncedParam } from "@/hooks/useDebouncedParam";
import { useSearch } from "@/services";

export function SearchInput() {
  const t = useTranslations("nav");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: true,
    }),
  );

  const [inputValue, setInputValue] = useDebouncedParam(
    q,
    (val) => setQ(val || null),
    350,
  );

  const { data, isLoading, isError, isFetching, refetch } = useSearch(q);
  const searchResult = data?.data;

  const hasCourses = (searchResult?.courses?.length ?? 0) > 0;
  const hasPosts = (searchResult?.posts?.length ?? 0) > 0;
  const hasResults = hasCourses || hasPosts;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsOpen(false);
    router.push(`/courses?search=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xs lg:max-w-md z-50"
    >
      <form
        onSubmit={handleSubmit}
        role="search"
        className="relative flex items-center"
      >
        <Search className="absolute right-3.5 ltr:right-auto ltr:left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          inputMode="search"
          value={inputValue}
          aria-label={t("searchPlaceholder")}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          placeholder={t("searchPlaceholder")}
          className="h-10 text-sm rounded-full bg-muted/50 border-border/60 pr-10 ltr:pr-8 ltr:pl-10 focus-visible:bg-background focus-visible:ring-primary/40 transition-all"
        />
      </form>

      {isOpen && inputValue.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border/80 bg-popover/95 backdrop-blur-xl shadow-2xl p-3 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[80vh] overflow-y-auto w-70 md:w-full no-scrollbar">
          <Link
            href={`/courses?search=${encodeURIComponent(inputValue.trim())}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-accent text-sm font-semibold text-primary transition-colors group mb-2"
          >
            <span>{t("viewAllResults", { query: inputValue })}</span>
            <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
          </Link>

          {isLoading && (
            <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("searching")}</span>
            </div>
          )}

          {!isLoading && isError && (
            <QueryErrorState
              compact
              onRetry={() => void refetch()}
              isRetrying={isFetching}
            />
          )}

          {!isLoading && !isError && !hasResults && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              {t("noResults", { query: inputValue })}
            </div>
          )}

          {!isLoading && !isError && hasResults && (
            <div className="space-y-4">
              {hasCourses && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-bold text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{t("coursesGroup")}</span>
                  </div>
                  <div className="space-y-1">
                    {searchResult?.courses?.map((course) => (
                      <Link
                        key={course?.id}
                        href={`/courses/${course?.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors"
                      >
                        <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-muted border border-border/50">
                          {course?.imageUrl && (
                            <Image
                              src={course?.imageUrl}
                              alt={course?.title}
                              fill
                              sizes="64px"
                              quality={75}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {course?.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {course?.category?.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {hasPosts && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-bold text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{t("postsGroup")}</span>
                  </div>
                  <div className="space-y-1">
                    {searchResult?.posts?.map((post) => (
                      <Link
                        key={post?.id}
                        href={`/blog/${post?.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors"
                      >
                        <div className="relative h-10 w-12 shrink-0 rounded-lg overflow-hidden bg-muted border border-border/50">
                          {post?.imageUrl && (
                            <Image
                              src={post?.imageUrl}
                              alt={post?.title}
                              fill
                              sizes="48px"
                              quality={75}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {post?.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
