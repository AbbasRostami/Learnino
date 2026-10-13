"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import { CourseActionsCell } from "./CourseActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (course: Course) => void;
}

export const getCoursesColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onEdit,
}: ColumnsProps): ColumnDef<Course>[] => {
  const fmt = (n: number) => formatNumber(n, locale);

  const formatPrice = (price: number) => {
    if (price === 0) return t("free");
    return fmt(price);
  };

  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "course",
      accessorKey: "title",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.course")} />
      ),
      cell: ({ row }) => {
        const course = row?.original;
        return (
          <div className="flex items-center gap-3 min-w-56">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              {course?.imageUrl ? (
                <Image
                  src={course?.imageUrl}
                  alt={course?.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <BookOpen className="h-5 w-5 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {course?.title}
              </span>
              <Link
                href={`/courses/${course?.slug}`}
                target="_blank"
                className="group flex items-center gap-1 mt-0.5 w-fit"
              >
                <span
                  className="text-xs text-muted-foreground group-hover:text-primary transition-colors truncate"
                  dir="ltr"
                >
                  /{course?.slug}
                </span>
                <ExternalLink className="h-3 w-3 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      id: "teacher",
      enableSorting: false,
      header: () => <span>{t("table.teacher")}</span>,
      cell: ({ row }) => {
        const teacher = row?.original?.teacher;
        if (!teacher) return <span className="text-muted-foreground">—</span>;

        return (
          <div className="flex items-center gap-2 min-w-40">
            <Avatar className="h-8 w-8 shrink-0 border border-border/50">
              <AvatarImage src={teacher?.avatar || ""} alt={teacher?.name} />
              <AvatarFallback className="bg-muted text-xs font-bold">
                {teacher?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-xs font-bold text-foreground truncate">
                {teacher?.name}
              </span>
              <Link
                href={`/teachers/${teacher?.slug}`}
                target="_blank"
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate w-fit flex items-center gap-1 group"
                dir="ltr"
              >
                <span>@{teacher?.slug}</span>
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      id: "category",
      enableSorting: false,
      header: () => <span>{t("table.category")}</span>,
      cell: ({ row }) => {
        const cat = row?.original?.category;
        if (!cat) return <span className="text-muted-foreground">—</span>;

        return (
          <Link
            href={`/categories/${cat?.slug}`}
            target="_blank"
            className="group flex flex-col gap-0.5 items-start hover:bg-muted/50 p-1.5 rounded-xl transition-colors w-fit min-w-36 max-w-48"
          >
            <span className="text-xs font-black text-foreground wrap-break-word w-full line-clamp-2">
              {cat?.name}
            </span>
            <span
              className="text-xs text-muted-foreground group-hover:text-primary transition-colors truncate w-full"
              dir="ltr"
            >
              /{cat?.slug}
            </span>
          </Link>
        );
      },
    },
    {
      id: "price",
      accessorKey: "price",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.price")} />
      ),
      cell: ({ row }) => {
        const price = row.original?.price ?? 0;
        return (
          <span
            className={cn(
              "text-xs font-black",
              price === 0 ? "text-emerald-600" : "text-foreground",
            )}
          >
            {formatPrice(price)}
          </span>
        );
      },
    },
    {
      id: "level",
      enableSorting: false,
      header: () => <span>{t("table.level")}</span>,
      cell: ({ row }) => {
        const level = row.original?.level;
        const colors: Record<string, string> = {
          BEGINNER: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
          INTERMEDIATE: "bg-amber-500/10 text-amber-600 border-amber-500/30",
          ADVANCED: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        };
        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border",
              colors[level] || "bg-muted text-muted-foreground border-border",
            )}
          >
            {t(`levels.${level}`)}
          </span>
        );
      },
    },
    {
      id: "stats",
      enableSorting: false,
      header: () => <span>{t("table.stats")}</span>,
      cell: ({ row }) => {
        const stats = row.original?.stats;
        return (
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold">
            <span
              className="flex items-center gap-1"
              title={t("stats.enrollments")}
            >
              <Users className="h-3 w-3 text-primary" />
              <span>{fmt(stats?.enrollments ?? 0)}</span>
            </span>
            <span
              className="flex items-center gap-1"
              title={t("stats.comments")}
            >
              <MessageCircle className="h-3 w-3 text-brand-cyan" />
              <span>{fmt(stats?.comments ?? 0)}</span>
            </span>
          </div>
        );
      },
    },
    {
      id: "status",
      enableSorting: false,
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const published = row.original?.published;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              published
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
            )}
          >
            {published ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            <span>{published ? t("status.published") : t("status.draft")}</span>
          </span>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <CourseActionsCell course={row.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};
