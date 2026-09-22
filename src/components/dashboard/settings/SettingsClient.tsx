"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, KeyRound, Palette, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SettingsAppearance } from "./SettingsAppearance";
import { SettingsChangeEmail } from "./SettingsChangeEmail";
import { SettingsChangePassword } from "./SettingsChangePassword";

export function SettingsClient() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
          <Settings2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">
            {t("menu.settings")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("settingsSubtitle")}
          </p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="flex flex-wrap w-full sm:w-fit rounded-2xl p-1 bg-muted/50 mb-6 h-auto">
          <TabsTrigger
            value="appearance"
            className="rounded-xl text-xs font-bold gap-1.5 px-4 py-2"
          >
            <Palette className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("tabAppearance")}</span>
          </TabsTrigger>

          <TabsTrigger
            value="password"
            className="rounded-xl text-xs font-bold gap-1.5 px-4 py-2"
          >
            <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("tabPassword")}</span>
          </TabsTrigger>

          <TabsTrigger
            value="email"
            className="rounded-xl text-xs font-bold gap-1.5 px-4 py-2"
          >
            <AtSign className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("tabEmail")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-0">
          <SettingsAppearance />
        </TabsContent>

        <TabsContent value="password" className="mt-0">
          <SettingsChangePassword />
        </TabsContent>

        <TabsContent value="email" className="mt-0">
          <SettingsChangeEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
