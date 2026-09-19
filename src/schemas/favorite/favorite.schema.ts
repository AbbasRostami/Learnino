import type { useTranslations } from "next-intl";
import { z } from "zod";

type FavoriteT = ReturnType<typeof useTranslations<"favorite">>;

export const getCourseFavoriteUuidSchema = (t: FavoriteT) =>
  z.object({
    courseId: z.string().uuid(t("validation.invalidCourseUuid")),
  });

export const getPostFavoriteUuidSchema = (t: FavoriteT) =>
  z.object({
    postId: z.string().uuid(t("validation.invalidPostUuid")),
  });

export const getFavoriteCoursesQuerySchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  });

export const getFavoritePostsQuerySchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  });
