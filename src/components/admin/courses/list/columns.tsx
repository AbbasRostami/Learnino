"use client";

import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useDeleteCourse, useToggleCoursePublish } from "@/services";
import type { Course } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  MessageCircle,
  MoreVertical,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  onSortChange?: (field: string) => void;
  onEdit: (course: Course) => void;
}

export const getCoursesColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  sortBy,
  order,
  onSortChange,
  onEdit,
}: ColumnsProps): ColumnDef<Course>[] => {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);

  const formatPrice = (price: number) => {
    if (price === 0) return t("free");
    return fmt(price);
  };

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-3 w-3 text-muted-foreground/60" />;
    }
    return order === "asc" ? (
      <ArrowUp className="h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 text-primary" />
    );
  };

  const SortBtn = ({ field, label }: { field: string; label: string }) => (
    <button
      type="button"
      onClick={() => onSortChange?.(field)}
      className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
    >
      <span>{label}</span>
      {renderSortIcon(field)}
    </button>
  );

  return [
    {
      id: "rowNumber",
      header: () => (
        <span className="w-4 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-4 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "course",
      header: () => (
        <SortBtn
          field={locale === "fa" ? "titleFa" : "titleEn"}
          label={t("table.course")}
        />
      ),
      cell: ({ row }) => {
        const course = row.original;
        return (
          <div className="flex items-center gap-3 min-w-56">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              {course.imageUrl ? (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
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
                {course.title}
              </span>
              <Link
                href={`/courses/${course.slug}`}
                target="_blank"
                className="group flex items-center gap-1 mt-0.5 w-fit"
              >
                <span
                  className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors font-mono truncate"
                  dir="ltr"
                >
                  /{course.slug}
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
      header: () => <span>{t("table.teacher")}</span>,
      cell: ({ row }) => {
        const teacher = row.original.teacher;
        if (!teacher) return <span className="text-muted-foreground">—</span>;

        return (
          <div className="flex items-center gap-2 min-w-40">
            <Avatar className="h-8 w-8 shrink-0 border border-border/50">
              <AvatarImage src={teacher.avatar || ""} alt={teacher.name} />
              <AvatarFallback className="bg-muted text-[10px] font-bold">
                {teacher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-xs font-bold text-foreground truncate">
                {teacher.name}
              </span>
              <Link
                href={`/teachers/${teacher.slug}`}
                target="_blank"
                className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors truncate w-fit flex items-center gap-1 group"
                dir="ltr"
              >
                <span>@{teacher.slug}</span>
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      id: "category",
      header: () => <span>{t("table.category")}</span>,
      cell: ({ row }) => {
        const cat = row.original.category;
        if (!cat) return <span className="text-muted-foreground">—</span>;

        return (
          <Link
            href={`/categories/${cat.slug}`}
            target="_blank"
            className="group flex flex-col gap-0.5 items-start hover:bg-muted/50 p-1.5 rounded-xl transition-colors w-fit min-w-36 max-w-48"
          >
            <span className="text-xs font-black text-foreground wrap-break-word w-full line-clamp-2">
              {cat.name}
            </span>
            <span
              className="text-[9px] font-mono text-muted-foreground group-hover:text-primary transition-colors truncate w-full"
              dir="ltr"
            >
              /{cat.slug}
            </span>
          </Link>
        );
      },
    },
    {
      id: "price",
      header: () => <SortBtn field="price" label={t("table.price")} />,
      cell: ({ row }) => {
        const price = row.original.price ?? 0;
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
      header: () => <span>{t("table.level")}</span>,
      cell: ({ row }) => {
        const level = row.original.level;
        const colors: Record<string, string> = {
          BEGINNER: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
          INTERMEDIATE: "bg-amber-500/10 text-amber-600 border-amber-500/30",
          ADVANCED: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        };
        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black border",
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
      header: () => <span>{t("table.stats")}</span>,
      cell: ({ row }) => {
        const stats = row.original.stats;
        return (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-bold">
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
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const published = row.original.published;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
      header: () => <SortBtn field="createdAt" label={t("table.createdAt")} />,
      cell: ({ row }) => (
        <span
          className="text-xs text-muted-foreground font-semibold"
          suppressHydrationWarning
        >
          {formatRelativeTime(row.original.createdAt, locale)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <CourseActionsCell course={row.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};

function CourseActionsCell({
  course,
  t,
  onEdit,
}: {
  course: Course;
  t: (key: string) => string;
  onEdit: (course: Course) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const isPublished = course.published;

  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  const { mutate: togglePublish, isPending: isToggling } =
    useToggleCoursePublish({
      onSuccessCallback: () => setPublishOpen(false),
    });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => onEdit(course)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Edit3 className="h-4 w-4 text-primary" />
            <span>{t("actions.edit")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPublishOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isPublished
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isPublished ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>
              {isPublished ? t("actions.unpublish") : t("actions.publish")}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("actions.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deleteCourse(course.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs truncate max-w-full">
              {course.title}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        variant={isPublished ? "warning" : "success"}
        icon={isPublished ? EyeOff : Eye}
        title={
          isPublished
            ? t("confirmPublish.unpublishTitle")
            : t("confirmPublish.publishTitle")
        }
        confirmLabel={
          isPublished
            ? t("confirmPublish.confirmUnpublish")
            : t("confirmPublish.confirmPublish")
        }
        cancelLabel={t("confirmPublish.cancel")}
        isPending={isToggling}
        onConfirm={() =>
          togglePublish({ id: course.id, published: !isPublished })
        }
        description={
          <>
            {isPublished
              ? t("confirmPublish.unpublishDescription")
              : t("confirmPublish.publishDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs truncate max-w-full">
              {course.title}
            </span>
          </>
        }
      />
    </>
  );
}
