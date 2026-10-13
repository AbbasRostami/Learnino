"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useBanUser } from "@/services";
import type { AdminUserListItem } from "@/types";
import { Eye, MoreVertical, ShieldOff } from "lucide-react";
import { useState } from "react";

interface UserActionsCellProps {
  user: AdminUserListItem;
  t: (key: string) => string;
}

export function UserActionsCell({ user, t }: UserActionsCellProps) {
  const router = useRouter();
  const [banDialogOpen, setBanDialogOpen] = useState(false);

  const isAdminUser = user?.role === "ADMIN";
  const displayName = user?.name || user?.email;

  const { mutate: banUser, isPending } = useBanUser({
    onSuccessCallback: () => setBanDialogOpen(false),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${user?.id}`)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Eye className="h-4 w-4 text-primary" />
            <span>{t("actions.viewDetails")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => !isAdminUser && setBanDialogOpen(true)}
            disabled={isAdminUser}
            className={cn(
              "gap-2 py-2 rounded-xl text-xs font-bold transition-colors",
              isAdminUser
                ? "opacity-40 cursor-not-allowed text-muted-foreground"
                : "cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-500/10",
            )}
          >
            <ShieldOff className="h-4 w-4" />
            <span>{t("actions.banUser")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        variant="destructive"
        icon={ShieldOff}
        title={t("confirmBan.title")}
        confirmLabel={t("confirmBan.confirm")}
        cancelLabel={t("confirmBan.cancel")}
        isPending={isPending}
        onConfirm={() => banUser(user?.id)}
        description={
          <>
            {t("confirmBan.description")}
            {displayName && (
              <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
                {displayName}
              </span>
            )}
          </>
        }
      />
    </>
  );
}
