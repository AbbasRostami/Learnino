import type { useTranslations } from "next-intl";
import { z } from "zod";

type ReactionT = ReturnType<typeof useTranslations<"reaction">>;

export const getToggleReactionSchema = (t: ReactionT) =>
  z.object({
    type: z.enum(["LIKE", "DISLIKE"], {
      error: (issue) =>
        issue.input === undefined
          ? t("validation.typeRequired")
          : t("validation.typeInvalid"),
    }),
  });

export const getReactionUuidSchema = (t: ReactionT) =>
  z.object({
    id: z.string().uuid({ message: t("validation.invalidUuid") }),
  });
