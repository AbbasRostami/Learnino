import type { useTranslations } from "next-intl";
import { z } from "zod";

type PostT = ReturnType<typeof useTranslations<"post">>;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const getImageSchema = (t: PostT) =>
  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, t("validation.imageMaxSize"))
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      t("validation.imageInvalidType"),
    );

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const getCreatePostSchema = (t: PostT) =>
  z.object({
    titleFa: z
      .string()
      .trim()
      .min(3, t("validation.titleFaMin"))
      .max(200, t("validation.titleFaMax")),

    titleEn: z
      .string()
      .trim()
      .min(3, t("validation.titleEnMin"))
      .max(200, t("validation.titleEnMax")),

    contentFa: z
      .string()
      .refine((v) => stripHtml(v).length >= 10, t("validation.contentFaMin"))
      .refine((v) => v.length <= 100_000, t("validation.contentMax")),

    contentEn: z
      .string()
      .refine((v) => stripHtml(v).length >= 10, t("validation.contentEnMin"))
      .refine((v) => v.length <= 100_000, t("validation.contentMax")),

    categoryId: z.string().uuid(t("validation.categoryIdInvalid")),

    published: z.boolean().optional().default(false),

    image: getImageSchema(t).optional().nullable(),
  });

export const getUpdatePostSchema = (t: PostT) =>
  z
    .object({
      titleFa: z
        .string()
        .trim()
        .min(3, t("validation.titleFaMin"))
        .max(200, t("validation.titleFaMax"))
        .optional()
        .or(z.literal("")),

      titleEn: z
        .string()
        .trim()
        .min(3, t("validation.titleEnMin"))
        .max(200, t("validation.titleEnMax"))
        .optional()
        .or(z.literal("")),

      contentFa: z
        .string()
        .refine(
          (v) => !v || stripHtml(v).length >= 10,
          t("validation.contentFaMin"),
        )
        .optional()
        .or(z.literal("")),

      contentEn: z
        .string()
        .refine(
          (v) => !v || stripHtml(v).length >= 10,
          t("validation.contentEnMin"),
        )
        .optional()
        .or(z.literal("")),

      categoryId: z.string().uuid(t("validation.categoryIdInvalid")).optional(),

      published: z.boolean().optional(),

      image: getImageSchema(t).optional().nullable(),
    })
    .refine(
      (data) =>
        Object.values(data).some(
          (v) => v !== undefined && v !== "" && v !== null,
        ),
      {
        message: t("validation.atLeastOneField"),
        path: ["titleFa"],
      },
    );
