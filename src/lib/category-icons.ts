import {
  Blocks,
  Boxes,
  Brain,
  Code,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  Lightbulb,
  Network,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export type CategoryStyle = {
  icon: LucideIcon;
  gradient: string;
  badgeColor: string;
};

const DYNAMIC_PALETTE: CategoryStyle[] = [
  {
    icon: Code,
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent text-sky-500",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold",
  },
  {
    icon: Server,
    gradient:
      "from-indigo-500/10 via-indigo-500/5 to-transparent text-indigo-500",
    badgeColor:
      "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold",
  },
  {
    icon: Database,
    gradient:
      "from-emerald-500/10 via-emerald-500/5 to-transparent text-emerald-500",
    badgeColor:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold",
  },
  {
    icon: Cpu,
    gradient:
      "from-violet-500/10 via-violet-500/5 to-transparent text-violet-500",
    badgeColor:
      "bg-violet-500/10 text-violet-700 dark:text-violet-300 font-bold",
  },
  {
    icon: ShieldCheck,
    gradient: "from-red-500/10 via-red-500/5 to-transparent text-red-500",
    badgeColor: "bg-red-500/10 text-red-700 dark:text-red-300 font-bold",
  },
  {
    icon: Smartphone,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold",
  },
  {
    icon: Terminal,
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent text-teal-500",
    badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold",
  },
  {
    icon: Palette,
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent text-pink-500",
    badgeColor: "bg-pink-500/10 text-pink-700 dark:text-pink-300 font-bold",
  },
  {
    icon: Blocks,
    gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent text-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold",
  },
  {
    icon: Rocket,
    gradient:
      "from-orange-500/10 via-orange-500/5 to-transparent text-orange-500",
    badgeColor:
      "bg-orange-500/10 text-orange-700 dark:text-orange-300 font-bold",
  },
  {
    icon: Brain,
    gradient:
      "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent text-fuchsia-500",
    badgeColor:
      "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 font-bold",
  },
  {
    icon: Network,
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent text-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold",
  },
  {
    icon: Lightbulb,
    gradient:
      "from-yellow-500/10 via-yellow-500/5 to-transparent text-yellow-500",
    badgeColor:
      "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 font-bold",
  },
  {
    icon: GraduationCap,
    gradient:
      "from-purple-500/10 via-purple-500/5 to-transparent text-purple-500",
    badgeColor:
      "bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold",
  },
  {
    icon: Boxes,
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent text-rose-500",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold",
  },
];

const DEFAULT_STYLE: CategoryStyle = {
  icon: Globe,
  gradient: "from-primary/10 via-primary/5 to-transparent text-primary",
  badgeColor: "bg-primary/10 text-primary font-bold",
};

const EXACT_SLUG_STYLES: Record<string, CategoryStyle> = {
  "فرانت-اند": DYNAMIC_PALETTE[0],
  فرانتاند: DYNAMIC_PALETTE[0],
  frontend: DYNAMIC_PALETTE[0],
  "front-end": DYNAMIC_PALETTE[0],

  "بک-اند": DYNAMIC_PALETTE[1],
  بکاند: DYNAMIC_PALETTE[1],
  backend: DYNAMIC_PALETTE[1],
  "back-end": DYNAMIC_PALETTE[1],

  "پایگاه-داده": DYNAMIC_PALETTE[2],
  database: DYNAMIC_PALETTE[2],

  "هوش-مصنوعی": DYNAMIC_PALETTE[3],
  "artificial-intelligence": DYNAMIC_PALETTE[3],
  ai: DYNAMIC_PALETTE[3],

  "امنیت-شبکه": DYNAMIC_PALETTE[4],
  cybersecurity: DYNAMIC_PALETTE[4],
  "network-security": DYNAMIC_PALETTE[4],

  "توسعه-موبایل": DYNAMIC_PALETTE[5],
  "mobile-development": DYNAMIC_PALETTE[5],

  دواپس: DYNAMIC_PALETTE[6],
  devops: DYNAMIC_PALETTE[6],

  "طراحی-رابط-و-تجربه-کاربری": DYNAMIC_PALETTE[7],
  "ui-ux-design": DYNAMIC_PALETTE[7],

  "لینوکس-و-سیستم-عامل": DYNAMIC_PALETTE[9],
  "لینوکس-و-سیستمعامل": DYNAMIC_PALETTE[9],
  "linux-and-os": DYNAMIC_PALETTE[9],
  "linux-os": DYNAMIC_PALETTE[9],

  بلاکچین: DYNAMIC_PALETTE[8],
  blockchain: DYNAMIC_PALETTE[8],
};

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug)
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return slug.trim().toLowerCase();
  }
}

function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function findStyleByKeyword(slug: string): CategoryStyle | null {
  if (slug.includes("فرانت") || slug.includes("front")) {
    return EXACT_SLUG_STYLES["frontend"];
  }
  if (slug.includes("بک") || slug.includes("back")) {
    return EXACT_SLUG_STYLES["backend"];
  }
  if (slug.includes("داده") || slug.includes("data") || slug.includes("sql")) {
    return EXACT_SLUG_STYLES["database"];
  }
  if (
    slug.includes("موبایل") ||
    slug.includes("mobile") ||
    slug.includes("اندروید") ||
    slug.includes("android") ||
    slug.includes("ios")
  ) {
    return EXACT_SLUG_STYLES["mobile-development"];
  }
  if (
    slug.includes("امنیت") ||
    slug.includes("sec") ||
    slug.includes("cyber")
  ) {
    return EXACT_SLUG_STYLES["cybersecurity"];
  }
  if (
    slug.includes("هوش") ||
    slug.includes("ai") ||
    slug.includes("intel") ||
    slug.includes("ml")
  ) {
    return EXACT_SLUG_STYLES["ai"];
  }
  if (
    slug.includes("دواپس") ||
    slug.includes("devops") ||
    slug.includes("cloud") ||
    slug.includes("docker")
  ) {
    return EXACT_SLUG_STYLES["devops"];
  }
  if (
    slug.includes("لینوکس") ||
    slug.includes("linux") ||
    slug.includes("عامل") ||
    slug.includes("os")
  ) {
    return EXACT_SLUG_STYLES["linux-os"];
  }
  if (
    slug.includes("طراحی") ||
    slug.includes("دیزاین") ||
    slug.includes("ui") ||
    slug.includes("ux") ||
    slug.includes("design")
  ) {
    return EXACT_SLUG_STYLES["ui-ux-design"];
  }
  if (
    slug.includes("بلاک") ||
    slug.includes("chain") ||
    slug.includes("web3") ||
    slug.includes("crypto")
  ) {
    return EXACT_SLUG_STYLES["blockchain"];
  }
  if (slug.includes("گیم") || slug.includes("game")) {
    return DYNAMIC_PALETTE[13];
  }
  if (slug.includes("شبکه") || slug.includes("net")) {
    return DYNAMIC_PALETTE[11];
  }

  return null;
}

export function getCategoryStyle(slug?: string | null): CategoryStyle {
  if (!slug) return DEFAULT_STYLE;

  const normalized = normalizeSlug(slug);

  if (EXACT_SLUG_STYLES[normalized]) {
    return EXACT_SLUG_STYLES[normalized];
  }

  const keywordStyle = findStyleByKeyword(normalized);
  if (keywordStyle) {
    return keywordStyle;
  }

  const paletteIndex = djb2Hash(normalized) % DYNAMIC_PALETTE.length;
  return DYNAMIC_PALETTE[paletteIndex] ?? DEFAULT_STYLE;
}

export function getCategoryIcon(slug?: string | null): LucideIcon {
  return getCategoryStyle(slug).icon;
}
