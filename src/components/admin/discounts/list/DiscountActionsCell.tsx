"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeleteDiscount, useToggleDiscount } from "@/services";
import type { Discount } from "@/types";
import { MoreVertical, Power, PowerOff, Trash2 } from "lucide-react";
import { useState } from "react";

interface DiscountActionsCellProps {
  discount: Discount;
  t: (key: string) => string;
}

export function DiscountActionsCell({ discount, t }: DiscountActionsCellProps) {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isActive = discount?.active;

  const { mutate: toggleDiscount, isPending: isToggling } = useToggleDiscount({
    onSuccessCallback: () => setToggleOpen(false),
  });

  const { mutate: deleteDiscount, isPending: isDeleting } = useDeleteDiscount({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => setToggleOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isActive
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isActive ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
            <span>{t("actions.toggle")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("actions.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={toggleOpen}
        onOpenChange={setToggleOpen}
        variant={isActive ? "warning" : "success"}
        icon={isActive ? PowerOff : Power}
        title={
          isActive
            ? t("confirmToggle.deactivateTitle")
            : t("confirmToggle.activateTitle")
        }
        confirmLabel={
          isActive
            ? t("confirmToggle.confirmDeactivate")
            : t("confirmToggle.confirmActivate")
        }
        cancelLabel={t("confirmToggle.cancel")}
        isPending={isToggling}
        onConfirm={() => toggleDiscount(discount?.id)}
        description={
          <>
            {isActive
              ? t("confirmToggle.deactivateDescription")
              : t("confirmToggle.activateDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs">
              {discount?.code}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deleteDiscount(discount?.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs">
              {discount?.code}
            </span>
          </>
        }
      />
    </>
  );
}
