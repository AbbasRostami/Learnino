export type LearningPathKey = "frontend" | "backend" | "ai" | "mobile";

export type LearningPath = {
  key: LearningPathKey;
  slug: string;
  steps: number;
  months: number;
  gradient: string;
  iconBg: string;
  iconColor: string;
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    key: "frontend",
    slug: "frontend-developer",
    steps: 5,
    months: 6,
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    key: "backend",
    slug: "backend-developer",
    steps: 6,
    months: 8,
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500 dark:text-indigo-400",
  },
  {
    key: "ai",
    slug: "ai-specialist",
    steps: 7,
    months: 10,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500 dark:text-violet-400",
  },
  {
    key: "mobile",
    slug: "mobile-developer",
    steps: 5,
    months: 7,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
];
