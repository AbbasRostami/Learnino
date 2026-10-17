"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getCreateCommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  placeholder,
  submitLabel,
  autoFocus = false,
}: CommentFormProps) {
  const t = useTranslations("comment");

  const schema = getCreateCommentSchema(t);
  const formSchema = z.object({ content: schema.shape.content });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const contentValue = watch("content") || "";

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data.content);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="relative">
        <Textarea
          {...register("content")}
          placeholder={placeholder || t("validation.contentMin")}
          className="min-h-28 rounded-2xl resize-none p-4 bg-background/50 focus:bg-background transition-colors"
          disabled={isSubmitting}
          autoFocus={autoFocus}
          maxLength={1000}
        />
        {errors?.content && (
          <p className="text-xs text-rose-500 font-bold mt-1 px-1">
            {errors?.content?.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/70">
          {contentValue?.length}/1000
        </span>
        <Button
          type="submit"
          disabled={
            isSubmitting || !!errors?.content || contentValue.trim().length < 2
          }
          className="rounded-full cursor-pointer px-6 gap-2 shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground"
          size="sm"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4 rtl:-scale-x-100" />
          )}
          <span className="font-bold">{submitLabel || "ارسال"}</span>
        </Button>
      </div>
    </form>
  );
}
