"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { FolderSearch, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface AdminEmptyStateProps {
  message: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function AdminEmptyState({
  message,
  description,
  actionLabel,
  actionHref,
}: AdminEmptyStateProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative mb-6"
      >
        <div
          className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
          aria-hidden="true"
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-linear-to-br from-primary via-primary to-brand-accent text-white shadow-xl shadow-primary/30">
          <FolderSearch className="h-10 w-10" aria-hidden="true" />
        </div>
      </motion.div>

      <h3 className="text-xl font-black text-foreground mb-2">{message}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
          {description}
        </p>
      )}

      {actionLabel && actionHref && (
        <Button size="lg" className="rounded-xl h-11 px-6 shadow-md gap-2">
          <Link href={actionHref}>
            <Plus className="h-4 w-4" />
            <span>{actionLabel}</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
