import type { useTranslations } from "next-intl";
import { z } from "zod";

type CourseT = ReturnType<typeof useTranslations<"course">>;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const getImageSchema = (t: CourseT) =>
  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, t("validation.imageMaxSize"))
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      t("validation.imageInvalidType"),
    );

export const getCreateCourseSchema = (t: CourseT) =>
  z.object({
    titleFa: z
      .string()
      .trim()
      .min(3, t("validation.titleFaMin"))
      .max(150, t("validation.titleFaMax")),

    titleEn: z
      .string()
      .trim()
      .min(3, t("validation.titleEnMin"))
      .max(150, t("validation.titleEnMax")),

    descriptionFa: z
      .string()
      .trim()
      .max(5000, t("validation.descriptionMax"))
      .optional()
      .or(z.literal("")),

    descriptionEn: z
      .string()
      .trim()
      .max(5000, t("validation.descriptionMax"))
      .optional()
      .or(z.literal("")),

    price: z.coerce
      .number({
        error: (issue) =>
          issue.input === undefined
            ? t("validation.priceRequired")
            : t("validation.priceInvalid"),
      })
      .int({ error: t("validation.priceInt") })
      .min(0, { error: t("validation.priceMin") })
      .max(1_000_000_000, { error: t("validation.priceMax") }),

    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),

    categoryId: z.string().uuid(t("validation.categoryIdInvalid")),

    teacherId: z.string().uuid(t("validation.teacherIdInvalid")),

    published: z.boolean().optional(),

    image: getImageSchema(t).optional().nullable(),
  });

export const getUpdateCourseSchema = (t: CourseT) =>
  z
    .object({
      titleFa: z
        .string()
        .trim()
        .min(3, t("validation.titleFaMin"))
        .max(150, t("validation.titleFaMax"))
        .optional()
        .or(z.literal("")),

      titleEn: z
        .string()
        .trim()
        .min(3, t("validation.titleEnMin"))
        .max(150, t("validation.titleEnMax"))
        .optional()
        .or(z.literal("")),

      descriptionFa: z
        .union([
          z.string().trim().max(5000, t("validation.descriptionMax")),
          z.null(),
          z.literal(""),
        ])
        .optional(),

      descriptionEn: z
        .union([
          z.string().trim().max(5000, t("validation.descriptionMax")),
          z.null(),
          z.literal(""),
        ])
        .optional(),

      price: z.coerce
        .number()
        .int(t("validation.priceInt"))
        .min(0, t("validation.priceMin"))
        .max(1_000_000_000, t("validation.priceMax"))
        .optional(),

      level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),

      categoryId: z.string().uuid(t("validation.categoryIdInvalid")).optional(),

      teacherId: z.string().uuid(t("validation.teacherIdInvalid")).optional(),

      published: z.boolean().optional(),

      image: getImageSchema(t).optional().nullable(),
    })
    .refine(
      (data) => {
        // حداقل یک فیلد باید ارسال شود
        return Object.values(data).some(
          (value) => value !== undefined && value !== "",
        );
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["titleFa"],
      },
    );

export const getToggleCoursePublishSchema = (t: CourseT) =>
  z.object({
    published: z.boolean({
      error: (issue) =>
        issue.input === undefined
          ? t("validation.publishedRequired")
          : t("validation.publishedInvalid"),
    }),
  });

export const getCoursesQuerySchema = (t: CourseT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    categories: z.array(z.string()).optional(),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
    minPrice: z.coerce.number().int().min(0).optional(),
    maxPrice: z.coerce.number().int().min(0).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
    sortBy: z
      .enum(["createdAt", "price", "titleFa", "titleEn"])
      .default("createdAt")
      .optional(),
    order: z.enum(["asc", "desc"]).default("desc").optional(),
  });

export const getAdminCoursesQuerySchema = (t: CourseT) =>
  getCoursesQuerySchema(t).extend({
    published: z.enum(["true", "false"]).optional(),
  });

export const getCourseUuidSchema = (t: CourseT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });

export const getCourseSlugSchema = (t: CourseT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, t("validation.slugRequired"))
      .max(200, t("validation.slugMaxLength")),
  });
