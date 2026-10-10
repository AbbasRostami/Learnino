"use client";

import { cn } from "@/lib/utils";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PostShareButtonProps {
  title: string;
  slug: string;
}

export function PostShareButton({ title, slug }: PostShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window?.location?.origin}/blog/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("لینک مقاله کپی شد");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "flex items-center justify-center h-9 w-9 rounded-full border transition-all cursor-pointer shadow-xs",
        copied
          ? "bg-emerald-100 border-emerald-300/60 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"
          : "bg-muted/50 dark:bg-muted/30 border-border/40 text-muted-foreground hover:bg-background dark:hover:bg-card hover:text-primary hover:border-primary/30",
      )}
      aria-label="اشتراک‌ گذاری"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
    </button>
  );
}
