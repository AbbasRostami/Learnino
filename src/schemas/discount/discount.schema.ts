import type { useTranslations } from "next-intl";
import { z } from "zod";

type DiscountT = ReturnType<typeof useTranslations<"discount">>;

const DISCOUNT_CODE_REGEX = /^[A-Z0-9_-]+$/;

export const getCreateDiscountSchema = (t: DiscountT) =>
  z
    .object({
      code: z
        .string()
        .trim()
        .min(3, { message: t("validation.codeMin") })
        .max(50, { message: t("validation.codeMax") })
        .toUpperCase()
        .regex(DISCOUNT_CODE_REGEX, { message: t("validation.codePattern") }),

      type: z.enum(["PERCENTAGE", "AMOUNT"], {
        message: t("validation.typeRequired"),
      }),

      value: z
        .number({ message: t("validation.valueInvalid") })
        .positive({ message: t("validation.valuePositive") }),

      maxUses: z
        .number({ message: t("validation.maxUsesInvalid") })
        .int({ message: t("validation.maxUsesInt") })
        .min(1, { message: t("validation.maxUsesMin") })
        .max(10000, { message: t("validation.maxUsesMax") }),

      expiresInDays: z
        .number({ message: t("validation.expiresInDaysInvalid") })
        .int({ message: t("validation.expiresInDaysInt") })
        .min(1, { message: t("validation.expiresInDaysMin") })
        .max(365, { message: t("validation.expiresInDaysMax") }),
    })
    .superRefine((data, ctx) => {
      if (data.type === "PERCENTAGE") {
        if (data.value < 1 || data.value > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.percentageRange"),
            path: ["value"],
          });
        }
      }

      if (data.type === "AMOUNT") {
        if (data.value < 1000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation.amountMin"),
            path: ["value"],
          });
        }
      }
    });

export type CreateDiscountSchemaType = ReturnType<
  typeof getCreateDiscountSchema
>;
export type CreateDiscountFormValues = z.infer<CreateDiscountSchemaType>;

export const getDiscountUuidSchema = (t: DiscountT) =>
  z.object({
    id: z.string().uuid({ message: t("validation.invalidUuid") }),
  });

export const getDiscountsQuerySchema = (t: DiscountT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    active: z.enum(["true", "false"]).optional(),
    search: z
      .string()
      .trim()
      .max(50, { message: t("validation.searchMaxLength") })
      .optional(),
  });
