import VerifyOtpForm from "@/components/auth/verify-email/VerifyOtpForm";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export const instant = false;

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email } = await searchParams;
  const locale = await getLocale();
  const verifiedEmail = email ?? "";

  if (!verifiedEmail) {
    redirect({ href: "/register", locale });
  }

  return <VerifyOtpForm email={verifiedEmail} />;
}
