"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthCardProps {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({
  title,
  description,
  icon,
  children,
  footer,
}: AuthCardProps) {
  const locale = useLocale();
  const isFa = locale === "fa";

  return (
    <div className="w-full max-w-md animate-in fade-in-50 zoom-in-95 duration-300">
      <div className="mb-6 flex justify-center">
        <Link
          href="/"
          className="relative h-12 w-48 block hover:opacity-90 transition-opacity"
        >
          <Image
            src={isFa ? "/logo/Farsi-Light.png" : "/logo/English-Light.png"}
            alt="Learnino Logo"
            fill
            priority
            className="object-contain dark:hidden"
            sizes="192px"
          />
          <Image
            src={isFa ? "/logo/Farsi-Dark.png" : "/logo/English-Dark.png"}
            alt="Learnino Logo"
            fill
            priority
            className="hidden object-contain dark:block"
            sizes="192px"
          />
        </Link>
      </div>

      <Card className="border-border/60 bg-card/95 backdrop-blur-md shadow-xl transition-all">
        <CardHeader className="space-y-2.5 text-center pb-1">
          {icon && (
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground border border-border/50 shadow-inner">
              {icon}
            </div>
          )}
          {title && (
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </CardTitle>
          )}
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>

        {footer && (
          <CardFooter className="justify-center border-t border-border/50 pt-3">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
