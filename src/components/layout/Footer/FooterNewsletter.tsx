"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function FooterNewsletter() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return;

    setIsSubscribing(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("newsletter.success"));
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <div className="relative mb-16 overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/5 to-brand-cyan/10 dark:from-primary/15 dark:via-brand-accent/10 dark:to-brand-cyan/15 p-8 md:p-10 shadow-lg shadow-primary/5">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl" />
      <Sparkles className="pointer-events-none absolute top-6 right-6 h-6 w-6 text-primary/30 animate-pulse" />
      <Sparkles className="pointer-events-none absolute bottom-6 left-6 h-4 w-4 text-brand-accent/40 animate-pulse [animation-delay:1s]" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold shadow-sm w-fit">
            <Mail className="h-3.5 w-3.5" />
            <span>{t("newsletter.badge")}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
            <span className="bg-linear-to-r from-primary via-brand-accent to-brand-cyan bg-clip-text text-transparent">
              {t("newsletter.title")}
            </span>
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            {t("newsletter.description")}
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full">
          <div className="relative">
            <Mail className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none inset-s-4" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.emailPlaceholder")}
              aria-label={t("newsletter.emailPlaceholder")}
              disabled={isSubscribing}
              className="h-13 rounded-full bg-background/70 dark:bg-background/50 backdrop-blur-sm border-border/60 focus-visible:border-primary shadow-sm text-sm text-start"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              size="sm"
              aria-label={t("newsletter.submit")}
              className="absolute top-1/2 -translate-y-1/2 inset-e-1.5 h-10 rounded-full px-4 gap-1.5 shadow-md shadow-primary/20 cursor-pointer bg-linear-to-r from-primary to-brand-accent hover:opacity-90 font-bold"
            >
              {isSubscribing ? (
                <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{t("newsletter.submit")}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
