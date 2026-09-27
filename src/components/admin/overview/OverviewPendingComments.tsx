"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useApproveComment, useRejectComment } from "@/services";
import type { LatestPendingComment } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import {
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface OverviewPendingCommentsProps {
  comments: LatestPendingComment[];
  locale: string;
  t: (key: string) => string;
}

export function OverviewPendingComments({
  comments,
  locale,
  t,
}: OverviewPendingCommentsProps) {
  return (
    <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
        <div>
          <CardTitle className="text-sm font-black flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-amber-500" />
            <span>{t("pendingComments.title")}</span>
          </CardTitle>
          <CardDescription className="text-[11px] mt-0.5">
            {t("pendingComments.description")}
          </CardDescription>
        </div>

        <Link
          href="/admin/comments"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "rounded-xl h-8 text-[11px] font-bold text-primary hover:bg-primary/10 cursor-pointer gap-1",
          )}
        >
          <span>{t("pendingComments.viewAll")}</span>
          <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-90" />
        </Link>
      </CardHeader>

      <CardContent className="pt-4">
        {comments?.length ? (
          <div className="flex flex-col gap-2.5">
            {comments?.map((c) => (
              <PendingCommentItem key={c?.id} comment={c} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
            {t("pendingComments.noPending")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PendingCommentItem({
  comment,
  locale,
}: {
  comment: LatestPendingComment;
  locale: string;
}) {
  const [done, setDone] = useState(false);

  const { mutate: approve, isPending: isApproving } = useApproveComment({
    onSuccessCallback: () => setDone(true),
  });

  const { mutate: reject, isPending: isRejecting } = useRejectComment({
    onSuccessCallback: () => setDone(true),
  });

  if (done) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-border/40 bg-background/80">
      <div className="flex flex-col min-w-0 flex-1 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-foreground truncate">
            {comment?.user?.name || comment?.user?.email?.split("@")?.[0]}
          </span>
          <span
            className="text-[10px] text-muted-foreground"
            suppressHydrationWarning
          >
            {formatRelativeTime(comment?.createdAt, locale)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
          {comment?.content}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          size="icon"
          variant="ghost"
          disabled={isApproving || isRejecting}
          onClick={() => approve(comment?.id)}
          className="h-8 w-8 rounded-lg hover:bg-emerald-500/10 text-emerald-600 cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          disabled={isApproving || isRejecting}
          onClick={() => reject(comment?.id)}
          className="h-8 w-8 rounded-lg hover:bg-rose-500/10 text-rose-600 cursor-pointer"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
