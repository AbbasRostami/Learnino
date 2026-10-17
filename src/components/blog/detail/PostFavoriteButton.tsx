"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTogglePostFavorite } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { Bookmark, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface PostFavoriteButtonProps {
  postId: string;
  isFavorite: boolean;
}

export function PostFavoriteButton({
  postId,
  isFavorite,
}: PostFavoriteButtonProps) {
  const t = useTranslations("favorite");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { mutate: toggleFavorite, isPending } = useTogglePostFavorite();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.info(t("loginRequired"));
      return;
    }
    toggleFavorite(postId);
  };

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center h-9 w-9 rounded-full border transition-all cursor-pointer disabled:opacity-50 shadow-xs",
        isFavorite
          ? "bg-amber-100 border-amber-300/60 text-amber-600 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-400"
          : "bg-muted/50 dark:bg-muted/30 border-border/40 text-muted-foreground hover:bg-background dark:hover:bg-card hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300/60 dark:hover:border-amber-500/30",
      )}
      aria-label="ذخیره مقاله"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Bookmark className={cn("h-4 w-4", isFavorite && "fill-current")} />
      )}
    </Button>
  );
}
