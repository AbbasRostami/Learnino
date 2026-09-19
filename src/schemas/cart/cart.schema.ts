import type { useTranslations } from "next-intl";
import { z } from "zod";

type CartT = ReturnType<typeof useTranslations<"cart">>;

const DISCOUNT_CODE_REGEX = /^[A-Z0-9_-]+$/;

export const getAddToCartSchema = (t: CartT) =>
  z.object({
    courseId: z.string().uuid(t("validation.invalidCourseUuid")),
  });

export const getRemoveFromCartSchema = (t: CartT) =>
  z.object({
    courseId: z.string().uuid(t("validation.invalidCourseUuid")),
  });

export const getApplyDiscountSchema = (t: CartT) =>
  z.object({
    code: z
      .string()
      .trim()
      .min(3, t("validation.codeMin"))
      .max(50, t("validation.codeMax"))
      .toUpperCase()
      .regex(DISCOUNT_CODE_REGEX, t("validation.codePattern")),
  });

export const getSyncCartSchema = (t: CartT) =>
  z.object({
    courseIds: z
      .array(z.string().uuid(t("validation.invalidCourseUuid")), {
        message: t("validation.courseIdsArray"),
      })
      .min(1, t("validation.courseIdsMin"))
      .max(50, t("validation.courseIdsMax")),
  });
