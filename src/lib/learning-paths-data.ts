import type { LucideIcon } from "lucide-react";
import { Brain, Code2, Server, Smartphone } from "lucide-react";

export interface LearningPath {
  slug: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  iconColor: string;
  courses: number;
  projects: number;
  hours: number;
  level: "beginner" | "intermediate" | "advanced";
  technologies: string[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: "frontend",
    icon: Code2,
    gradient: "from-primary to-indigo-500",
    bgGradient: "from-primary/10 via-indigo-500/5 to-transparent",
    iconColor: "text-primary",
    courses: 8,
    projects: 6,
    hours: 120,
    level: "beginner",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    slug: "backend",
    icon: Server,
    gradient: "from-brand-accent to-purple-500",
    bgGradient: "from-brand-accent/10 via-purple-500/5 to-transparent",
    iconColor: "text-brand-accent",
    courses: 7,
    projects: 5,
    hours: 100,
    level: "intermediate",
    technologies: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    slug: "ai",
    icon: Brain,
    gradient: "from-brand-cyan to-cyan-500",
    bgGradient: "from-brand-cyan/10 via-cyan-500/5 to-transparent",
    iconColor: "text-brand-cyan",
    courses: 9,
    projects: 7,
    hours: 150,
    level: "advanced",
    technologies: ["Python", "NumPy", "Pandas", "TensorFlow", "PyTorch"],
  },
  {
    slug: "mobile",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconColor: "text-emerald-500",
    courses: 6,
    projects: 5,
    hours: 90,
    level: "intermediate",
    technologies: ["React Native", "Flutter", "Dart", "Firebase"],
  },
];
