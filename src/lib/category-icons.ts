import {
  Blocks,
  Code,
  Cpu,
  Database,
  Globe,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";

type CategoryStyle = {
  icon: LucideIcon;
  gradient: string;
  badgeColor: string;
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: Globe,
  gradient: "from-primary/10 via-primary/5 to-transparent text-primary",
  badgeColor: "bg-primary/10 text-primary",
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  فرانتاند: {
    icon: Code,
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent text-sky-500",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  "فرانت-اند": {
    icon: Code,
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent text-sky-500",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  frontend: {
    icon: Code,
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent text-sky-500",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },

  بکاند: {
    icon: Server,
    gradient:
      "from-indigo-500/10 via-indigo-500/5 to-transparent text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  "بک-اند": {
    icon: Server,
    gradient:
      "from-indigo-500/10 via-indigo-500/5 to-transparent text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  backend: {
    icon: Server,
    gradient:
      "from-indigo-500/10 via-indigo-500/5 to-transparent text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },

  "پایگاه-داده": {
    icon: Database,
    gradient:
      "from-emerald-500/10 via-emerald-500/5 to-transparent text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  database: {
    icon: Database,
    gradient:
      "from-emerald-500/10 via-emerald-500/5 to-transparent text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },

  "هوش-مصنوعی": {
    icon: Cpu,
    gradient:
      "from-violet-500/10 via-violet-500/5 to-transparent text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  "artificial-intelligence": {
    icon: Cpu,
    gradient:
      "from-violet-500/10 via-violet-500/5 to-transparent text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  ai: {
    icon: Cpu,
    gradient:
      "from-violet-500/10 via-violet-500/5 to-transparent text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },

  "امنیت-شبکه": {
    icon: ShieldCheck,
    gradient: "from-red-500/10 via-red-500/5 to-transparent text-red-500",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  cybersecurity: {
    icon: ShieldCheck,
    gradient: "from-red-500/10 via-red-500/5 to-transparent text-red-500",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  "network-security": {
    icon: ShieldCheck,
    gradient: "from-red-500/10 via-red-500/5 to-transparent text-red-500",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400",
  },

  "توسعه-موبایل": {
    icon: Smartphone,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  "mobile-development": {
    icon: Smartphone,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },

  دواپس: {
    icon: Terminal,
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent text-teal-500",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  devops: {
    icon: Terminal,
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent text-teal-500",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },

  "طراحی-رابط-و-تجربه-کاربری": {
    icon: Palette,
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent text-pink-500",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  "ui-ux-design": {
    icon: Palette,
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent text-pink-500",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },

  "لینوکس-و-سیستمعامل": {
    icon: Terminal,
    gradient:
      "from-orange-500/10 via-orange-500/5 to-transparent text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  "linux-and-os": {
    icon: Terminal,
    gradient:
      "from-orange-500/10 via-orange-500/5 to-transparent text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  "linux-os": {
    icon: Terminal,
    gradient:
      "from-orange-500/10 via-orange-500/5 to-transparent text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },

  بلاکچین: {
    icon: Blocks,
    gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent text-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  blockchain: {
    icon: Blocks,
    gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent text-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
};

export function getCategoryStyle(slug: string): CategoryStyle {
  if (!slug) return DEFAULT_STYLE;

  const normalized = decodeURIComponent(slug)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  if (CATEGORY_STYLES[normalized]) {
    return CATEGORY_STYLES[normalized];
  }

  if (normalized.includes("front")) return CATEGORY_STYLES["frontend"];
  if (normalized.includes("back")) return CATEGORY_STYLES["backend"];
  if (normalized.includes("data")) return CATEGORY_STYLES["database"];
  if (normalized.includes("mobile"))
    return CATEGORY_STYLES["mobile-development"];
  if (normalized.includes("sec") || normalized.includes("cyber"))
    return CATEGORY_STYLES["cybersecurity"];
  if (normalized.includes("ai") || normalized.includes("intel"))
    return CATEGORY_STYLES["artificial-intelligence"];
  if (normalized.includes("devops")) return CATEGORY_STYLES["devops"];
  if (normalized.includes("linux")) return CATEGORY_STYLES["linux-os"];
  if (normalized.includes("ui") || normalized.includes("ux"))
    return CATEGORY_STYLES["ui-ux-design"];
  if (normalized.includes("chain")) return CATEGORY_STYLES["blockchain"];

  return DEFAULT_STYLE;
}
