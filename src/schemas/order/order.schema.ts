import type { useTranslations } from "next-intl";
import { z } from "zod";

type OrderT = ReturnType<typeof useTranslations<"order">>;

export const getOrderUuidSchema = (t: OrderT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });

export const getMyOrdersQuerySchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
  });

export const getAdminOrdersQuerySchema = (t: OrderT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
  });
