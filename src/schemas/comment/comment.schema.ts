import type { useTranslations } from "next-intl";
import { z } from "zod";

type CommentT = ReturnType<typeof useTranslations<"comment">>;

export const getCreateCommentSchema = (t: CommentT) =>
  z
    .object({
      content: z
        .string()
        .trim()
        .min(2, t("validation.contentMin"))
        .max(1000, t("validation.contentMax")),

      courseId: z.string().uuid(t("validation.invalidCourseUuid")).optional(),
      postId: z.string().uuid(t("validation.invalidPostUuid")).optional(),
      parentId: z.string().uuid(t("validation.invalidParentUuid")).optional(),
    })
    .superRefine((data, ctx) => {
      const hasCourse = Boolean(data.courseId);
      const hasPost = Boolean(data.postId);

      if (!hasCourse && !hasPost) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.targetRequired"),
          path: ["courseId"],
        });
      }

      if (hasCourse && hasPost) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.bothTargetsProvided"),
          path: ["postId"],
        });
      }
    });

export const getCommentSlugParamsSchema = (t: CommentT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, t("validation.slugRequired"))
      .max(200, t("validation.slugMaxLength")),
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  });

export const getMyCommentsQuerySchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  });

export const getAdminCommentsQuerySchema = (t: CommentT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
  });

export const getCommentUuidSchema = (t: CommentT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });
