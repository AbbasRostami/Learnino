"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
  placeholder?: string;
  submitLabel?: string;
  autoFocus?: boolean;
}

export function CommentForm({
  onSubmit,
  isSubmitting,
  placeholder = "نظر خود را بنویسید...",
  submitLabel = "ارسال",
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || content.trim().length < 2) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-24 rounded-2xl resize-none"
        disabled={isSubmitting}
        autoFocus={autoFocus}
        maxLength={1000}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {content.length}/1000
        </span>
        <Button
          type="submit"
          disabled={isSubmitting || content.trim().length < 2}
          className="rounded-full cursor-pointer gap-2"
          size="sm"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>{submitLabel}</span>
        </Button>
      </div>
    </form>
  );
}