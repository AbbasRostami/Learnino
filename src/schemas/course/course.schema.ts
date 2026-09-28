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
    .custom<File | null | undefined>()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE),
      { message: t("validation.imageMaxSize") },
    )
    .refine(
      (file) =>
        !file ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: t("validation.imageInvalidType") },
    );

export const getCreateCourseSchema = (t: CourseT) =>
  z.object({
    titleFa: z
      .string()
      .trim()
      .min(3, { message: t("validation.titleFaMin") })
      .max(150, { message: t("validation.titleFaMax") }),

    titleEn: z
      .string()
      .trim()
      .min(3, { message: t("validation.titleEnMin") })
      .max(150, { message: t("validation.titleEnMax") }),

    descriptionFa: z
      .string()
      .trim()
      .max(5000, { message: t("validation.descriptionMax") })
      .optional()
      .or(z.literal("")),

    descriptionEn: z
      .string()
      .trim()
      .max(5000, { message: t("validation.descriptionMax") })
      .optional()
      .or(z.literal("")),

    price: z
      .number({ message: t("validation.priceInvalid") })
      .int({ message: t("validation.priceInt") })
      .min(0, { message: t("validation.priceMin") })
      .max(1_000_000_000, { message: t("validation.priceMax") }),

    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),

    categoryId: z
      .string()
      .min(1, { message: t("validation.categoryIdInvalid") })
      .uuid({ message: t("validation.categoryIdInvalid") }),

    teacherId: z
      .string()
      .min(1, { message: t("validation.teacherIdInvalid") })
      .uuid({ message: t("validation.teacherIdInvalid") }),

    published: z.boolean().default(false),

    image: getImageSchema(t).optional().nullable(),
  });

export const getUpdateCourseSchema = (t: CourseT) =>
  z
    .object({
      titleFa: z
        .string()
        .trim()
        .max(150, { message: t("validation.titleFaMax") })
        .optional()
        .or(z.literal("")),

      titleEn: z
        .string()
        .trim()
        .max(150, { message: t("validation.titleEnMax") })
        .optional()
        .or(z.literal("")),

      descriptionFa: z
        .string()
        .trim()
        .max(5000, { message: t("validation.descriptionMax") })
        .optional()
        .nullable()
        .or(z.literal("")),

      descriptionEn: z
        .string()
        .trim()
        .max(5000, { message: t("validation.descriptionMax") })
        .optional()
        .nullable()
        .or(z.literal("")),

      price: z
        .number({ message: t("validation.priceInvalid") })
        .int({ message: t("validation.priceInt") })
        .min(0, { message: t("validation.priceMin") })
        .max(1_000_000_000, { message: t("validation.priceMax") })
        .optional(),

      level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),

      categoryId: z
        .string()
        .uuid({ message: t("validation.categoryIdInvalid") })
        .optional()
        .or(z.literal("")),

      teacherId: z
        .string()
        .uuid({ message: t("validation.teacherIdInvalid") })
        .optional()
        .or(z.literal("")),

      published: z.boolean().optional(),

      image: getImageSchema(t).optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (
        data?.titleFa &&
        data.titleFa.trim().length > 0 &&
        data.titleFa.trim().length < 3
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.titleFaMin"),
          path: ["titleFa"],
        });
      }
      if (
        data?.titleEn &&
        data.titleEn.trim().length > 0 &&
        data.titleEn.trim().length < 3
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.titleEnMin"),
          path: ["titleEn"],
        });
      }
    })
    .refine(
      (data) => {
        return (
          Boolean(data?.titleFa && data.titleFa.trim().length > 0) ||
          Boolean(data?.titleEn && data.titleEn.trim().length > 0) ||
          Boolean(
            data?.descriptionFa && data.descriptionFa.trim().length > 0,
          ) ||
          Boolean(
            data?.descriptionEn && data.descriptionEn.trim().length > 0,
          ) ||
          data?.price !== undefined ||
          data?.level !== undefined ||
          Boolean(data?.categoryId) ||
          Boolean(data?.teacherId) ||
          data?.published !== undefined ||
          data?.image instanceof File
        );
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["titleFa"],
      },
    );

export type CreateCourseSchemaType = ReturnType<typeof getCreateCourseSchema>;
export type CreateCourseFormValues = z.infer<CreateCourseSchemaType>;

export type UpdateCourseSchemaType = ReturnType<typeof getUpdateCourseSchema>;
export type UpdateCourseFormValues = z.infer<UpdateCourseSchemaType>;

export const getToggleCoursePublishSchema = (t: CourseT) =>
  z.object({
    published: z.boolean({
      message: t("validation.publishedInvalid"),
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
      .max(100, { message: t("validation.searchMaxLength") })
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
    id: z.string().uuid({ message: t("validation.invalidUuid") }),
  });

export const getCourseSlugSchema = (t: CourseT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, { message: t("validation.slugRequired") })
      .max(200, { message: t("validation.slugMaxLength") }),
  });
