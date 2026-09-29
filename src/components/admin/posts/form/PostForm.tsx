"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCreatePostSchema, getUpdatePostSchema } from "@/schemas";
import {
  useAdminCategories,
  useCreatePost,
  useUpdatePost,
  useUploadEditorImage,
} from "@/services";
import type { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Languages, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { TiptapEditor } from "./editor/TiptapEditor";
import { PostImageField } from "./PostImageField";

interface PostFormProps {
  post?: Post | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const t = useTranslations("admin.posts.form");
  const tPost = useTranslations("post");
  const isEdit = Boolean(post);

  const schema = isEdit
    ? getUpdatePostSchema(tPost)
    : getCreatePostSchema(tPost);

  type FormValues = z.infer<typeof schema>;

  const { data: categoriesData } = useAdminCategories({ limit: 100 });
  const categories = categoriesData?.data?.items ?? [];
  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titleFa: "",
      titleEn: "",
      contentFa: "",
      contentEn: "",
      categoryId: "",
      published: false,
      image: null,
    } as FormValues,
  });

  const { mutateAsync: uploadEditorImage } = useUploadEditorImage({});

  const editorUploadFn = async (file: File): Promise<string | null> => {
    try {
      const result = await uploadEditorImage({ image: file });
      return result?.data?.url ?? null;
    } catch {
      return null;
    }
  };

  const { mutate: createPost, isPending: isCreating } = useCreatePost({
    onSuccessCallback: () => {
      onSuccess();
      reset();
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost({
    onSuccessCallback: () => {
      onSuccess();
      reset();
    },
  });

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (post) {
      reset({
        titleFa: post.title || "",
        titleEn: post.title || "",
        contentFa: post.content || "",
        contentEn: post.content || "",
        categoryId: post.category?.id || "",
        published: post.published,
        image: null,
      } as FormValues);
    } else {
      reset({
        titleFa: "",
        titleEn: "",
        contentFa: "",
        contentEn: "",
        categoryId: "",
        published: false,
        image: null,
      } as FormValues);
    }
  }, [post, reset]);

  const onSubmit = (data: FormValues) => {
    const trimOrUndef = (v?: string | null) =>
      v && typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

    if (isEdit && post) {
      updatePost({
        id: post.id,
        titleFa: trimOrUndef(data.titleFa),
        titleEn: trimOrUndef(data.titleEn),
        contentFa: trimOrUndef(data.contentFa as string | undefined),
        contentEn: trimOrUndef(data.contentEn as string | undefined),
        categoryId: data.categoryId || undefined,
        published:
          typeof data.published === "boolean" ? data.published : undefined,
        image: data.image instanceof File ? data.image : undefined,
      });
    } else {
      const d = data as z.infer<ReturnType<typeof getCreatePostSchema>>;
      createPost({
        titleFa: d.titleFa.trim(),
        titleEn: d.titleEn.trim(),
        contentFa: d.contentFa,
        contentEn: d.contentEn,
        categoryId: d.categoryId,
        published: d.published ?? false,
        image: d.image instanceof File ? d.image : undefined,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-2"
      noValidate
    >
      <Controller
        control={control}
        name={"image" as keyof FormValues}
        render={({ field }) => (
          <PostImageField
            currentImageUrl={post?.imageUrl}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors.image?.message as string}
          />
        )}
      />

      <div className="space-y-1.5">
        <Label className="text-xs font-bold">{t("categoryLabel")}</Label>
        <Controller
          control={control}
          name={"categoryId" as keyof FormValues}
          render={({ field }) => (
            <Select
              items={[
                { value: "", label: t("categoryPlaceholder") },
                ...categoryOptions,
              ]}
              value={(field.value as string) || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                aria-invalid={!!errors.categoryId}
              >
                <SelectValue placeholder={t("categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                className="rounded-xl"
              >
                <SelectGroup>
                  {categoryOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs font-bold cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <span className="text-[10px] font-bold text-rose-500">
            {errors.categoryId.message as string}
          </span>
        )}
      </div>

      <Tabs defaultValue="fa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl p-1 bg-muted/60">
          <TabsTrigger
            value="fa"
            className="rounded-lg text-xs font-black gap-2 cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            <Languages className="h-4 w-4" />
            <span>فارسی</span>
          </TabsTrigger>
          <TabsTrigger
            value="en"
            className="rounded-lg text-xs font-black gap-2 cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            <Languages className="h-4 w-4" />
            <span>English</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fa" className="mt-4 flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="titleFa" className="text-xs font-bold">
              {t("titleFaLabel")}
            </Label>
            <Input
              id="titleFa"
              {...register("titleFa")}
              placeholder={t("titleFaPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="rtl"
              disabled={isPending}
              aria-invalid={!!errors.titleFa}
            />
            {errors.titleFa && (
              <span className="text-[10px] font-bold text-rose-500">
                {errors.titleFa.message as string}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">{t("contentFaLabel")}</Label>
            <Controller
              control={control}
              name={"contentFa" as keyof FormValues}
              render={({ field }) => (
                <TiptapEditor
                  value={(field.value as string) || ""}
                  onChange={field.onChange}
                  uploadFn={editorUploadFn}
                  placeholder={t("contentFaPlaceholder")}
                  dir="rtl"
                />
              )}
            />
            {errors.contentFa && (
              <span className="text-[10px] font-bold text-rose-500">
                {errors.contentFa.message as string}
              </span>
            )}
          </div>
        </TabsContent>

        <TabsContent value="en" className="mt-4 flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="titleEn" className="text-xs font-bold">
              {t("titleEnLabel")}
            </Label>
            <Input
              id="titleEn"
              {...register("titleEn")}
              placeholder={t("titleEnPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold font-mono bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors.titleEn}
            />
            {errors.titleEn && (
              <span className="text-[10px] font-bold text-rose-500">
                {errors.titleEn.message as string}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">{t("contentEnLabel")}</Label>
            <Controller
              control={control}
              name={"contentEn" as keyof FormValues}
              render={({ field }) => (
                <TiptapEditor
                  value={(field.value as string) || ""}
                  onChange={field.onChange}
                  uploadFn={editorUploadFn}
                  placeholder={t("contentEnPlaceholder")}
                  dir="ltr"
                />
              )}
            />
            {errors.contentEn && (
              <span className="text-[10px] font-bold text-rose-500">
                {errors.contentEn.message as string}
              </span>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30">
        <Controller
          control={control}
          name={"published" as keyof FormValues}
          render={({ field }) => (
            <Switch
              id="published"
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <Label
            htmlFor="published"
            className="text-xs font-bold cursor-pointer"
          >
            {t("publishedLabel")}
          </Label>
          <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
            {t("publishedDescription")}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold cursor-pointer"
        >
          {t("cancel")}
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-white"
        >
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          <span>{isEdit ? t("submitEdit") : t("submitCreate")}</span>
        </Button>
      </div>
    </form>
  );
}
