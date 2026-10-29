"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { getCommentFormSchema, type CommentFormValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

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

  const formSchema = useMemo(() => getCommentFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { content: "" },
  });

  const contentValue = watch("content") || "";

  const handleFormSubmit = (data: CommentFormValues) => {
    onSubmit(data.content);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-3"
    >
      <Field data-invalid={!!errors.content} className="gap-1">
        <Textarea
          {...register("content")}
          placeholder={placeholder || t("validation.contentMin")}
          className="min-h-28 rounded-2xl resize-none p-4 bg-background/50 focus:bg-background transition-colors"
          disabled={isSubmitting}
          autoFocus={autoFocus}
          maxLength={1000}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <FieldError
            errors={[errors.content]}
            className="px-1 text-xs font-bold"
          />
        )}
      </Field>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/70">
          {contentValue.length}/1000
        </span>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="rounded-full cursor-pointer py-4 px-4 gap-2 shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground"
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
