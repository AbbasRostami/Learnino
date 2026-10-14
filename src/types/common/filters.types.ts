export type SortOrder = "asc" | "desc";

export const VISIBILITY_OPTIONS = ["true", "false"] as const;
export type VisibilityFilter = (typeof VISIBILITY_OPTIONS)[number];

export type BooleanFilter = "true" | "false";
