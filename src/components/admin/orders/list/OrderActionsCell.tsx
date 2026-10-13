"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminCancelOrder } from "@/services";
import type { AdminOrderListItem } from "@/types";
import { Eye, MoreVertical, XCircle } from "lucide-react";
import { useState } from "react";

interface OrderActionsCellProps {
  order: AdminOrderListItem;
  t: (key: string) => string;
  onViewDetails: (orderId: string) => void;
}

export function OrderActionsCell({
  order,
  t,
  onViewDetails,
}: OrderActionsCellProps) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const isPending = order?.status === "PENDING";

  const { mutate: cancelOrder, isPending: isCancelling } = useAdminCancelOrder({
    onSuccessCallback: () => setCancelOpen(false),
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
            onClick={() => onViewDetails(order?.id)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Eye className="h-4 w-4 text-primary" />
            <span>{t("actions.viewDetails")}</span>
          </DropdownMenuItem>

          {isPending && (
            <>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => setCancelOpen(true)}
                className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
              >
                <XCircle className="h-4 w-4" />
                <span>{t("actions.cancelOrder")}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        variant="destructive"
        icon={XCircle}
        title={t("confirmCancel.title")}
        confirmLabel={t("confirmCancel.confirm")}
        cancelLabel={t("confirmCancel.cancel")}
        isPending={isCancelling}
        onConfirm={() => cancelOrder(order?.id)}
        description={
          <>
            {t("confirmCancel.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs">
              #{order?.id}
            </span>
          </>
        }
      />
    </>
  );
}
