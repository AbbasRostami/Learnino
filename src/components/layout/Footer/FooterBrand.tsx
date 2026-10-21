"use client";

import { useTranslations } from "next-intl";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Logo } from "../Navbar/Logo";

export function FooterBrand() {
  const t = useTranslations("footer");

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

  return (
    <div className="lg:col-span-5 flex flex-col gap-5">
      <Logo />

      <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
        {t("description")}
      </p>

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
  );
}
