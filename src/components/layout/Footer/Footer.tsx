"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { Logo } from "../Navbar/Logo";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color:
        "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/40",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "Youtube",
      color: "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/40",
    },
    {
      icon: FaXTwitter,
      href: "#",
      label: "Twitter",
      color:
        "hover:bg-foreground/10 hover:text-foreground hover:border-foreground/40",
    },
    {
      icon: FaTelegramPlane,
      href: "#",
      label: "Telegram",
      color: "hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/40",
    },
  ];

  const suggestedCourses = [
    { titleKey: "courseHtmlCss" as const, href: "/courses/html-css" },
    { titleKey: "courseJavascript" as const, href: "/courses/javascript" },
    { titleKey: "courseReactNext" as const, href: "/courses/react-next" },
    { titleKey: "coursePython" as const, href: "/courses/python" },
  ];

  const quickAccess = [
    { titleKey: "linkLearningPaths" as const, href: "/learning-paths" },
    { titleKey: "linkSql" as const, href: "/courses/sql" },
    { titleKey: "linkBlog" as const, href: "/blog" },
    { titleKey: "linkFaq" as const, href: "/faq" },
  ];

  const stats = [
    {
      icon: Users,
      value: "15K+",
      labelKey: "stats.students" as const,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: BookOpen,
      value: "120+",
      labelKey: "stats.courses" as const,
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10",
    },
    {
      icon: GraduationCap,
      value: "50+",
      labelKey: "stats.instructors" as const,
      color: "text-brand-cyan",
      bgColor: "bg-brand-cyan/10",
    },
    {
      icon: Clock,
      value: "800+",
      labelKey: "stats.hours" as const,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

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
    <footer className="relative overflow-hidden border-t border-border/60 bg-linear-to-b from-background via-card/30 to-background pt-20 pb-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-accent/20 dark:bg-brand-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-brand-cyan/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${stat.bgColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t(stat.labelKey)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

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

              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                <span className="bg-linear-to-r from-primary via-brand-accent to-brand-cyan bg-clip-text text-transparent">
                  {t("newsletter.title")}
                </span>
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                {t("newsletter.description")}
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 w-full"
            >
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none inset-s-4" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter.emailPlaceholder")}
                  disabled={isSubscribing}
                  dir="ltr"
                  className="h-13 rounded-full ps-11 pe-32 bg-background/70 dark:bg-background/50 backdrop-blur-sm border-border/60 focus-visible:border-primary shadow-sm text-sm"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  size="sm"
                  className="absolute top-1/2 -translate-y-1/2 inset-e-1.5 h-10 rounded-full px-4 gap-1.5 shadow-md shadow-primary/20 cursor-pointer bg-linear-to-r from-primary to-brand-accent hover:opacity-90 font-bold"
                >
                  {isSubscribing ? (
                    <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {t("newsletter.submit")}
                  </span>
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-brand-accent" />
                <span>{t("newsletter.privacy")}</span>
              </p>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Logo />

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {t("description")}
            </p>

            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-brand-accent/10 border border-primary/20 text-xs font-bold text-primary shadow-xs w-fit">
              <Sparkles className="h-3 w-3" />
              <span>{t("brand.tagline")}</span>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm text-muted-foreground transition-all duration-300 cursor-pointer shadow-xs hover:scale-110 hover:shadow-md ${social.color}`}
                >
                  <social.icon className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 rounded-full bg-linear-to-b from-primary to-brand-accent" />
              <h3 className="text-sm font-black text-foreground tracking-wide">
                {t("suggestedCourses")}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              {suggestedCourses.map((item) => (
                <Link
                  key={item.titleKey}
                  href={item.href}
                  className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary group-hover:w-4 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    {t(item.titleKey)}
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ms-auto rtl:rotate-90" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 rounded-full bg-linear-to-b from-brand-accent to-brand-cyan" />
              <h3 className="text-sm font-black text-foreground tracking-wide">
                {t("quickLinks")}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              {quickAccess.map((item) => (
                <Link
                  key={item.titleKey}
                  href={item.href}
                  className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-brand-accent transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40 group-hover:bg-brand-accent group-hover:w-4 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    {t(item.titleKey)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/10 dark:from-primary/15 dark:via-brand-accent/15 dark:to-brand-cyan/15 p-5 shadow-sm">
            <Sparkles className="absolute top-3 right-3 h-4 w-4 text-primary/40 animate-pulse" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative flex flex-col gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-brand-accent text-primary-foreground shadow-md shadow-primary/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-base font-black text-foreground">
                {t("highlightTitle")}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("highlightText")}
              </p>
            </div>
          </div>
        </div>

        <div className="relative my-8">
          <Separator className="opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-background border border-border/60 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-2 text-center md:text-start">
            <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>
              © {CURRENT_YEAR} {t("rights")}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <p className="flex items-center gap-1.5">
              <span>{t("brand.madeWith")}</span>
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
              <span>{t("brand.loveIn")}</span>
              <MapPin className="h-3 w-3 text-brand-accent" />
            </p>

            <span className="hidden sm:inline-block h-3 w-px bg-border" />

            <p className="flex items-center gap-1.5">
              <span>{t("developedBy")}</span>
              <a
                href="https://github.com/AbbasRostami"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-bold text-foreground hover:text-primary transition-colors relative"
              >
                <span className="relative z-10">Abbas Rostami</span>
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-linear-to-r from-primary via-brand-accent to-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
