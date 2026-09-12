import VerifyOtpForm from "@/components/auth/verify-email/VerifyOtpForm";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email } = await searchParams;
  const locale = await getLocale();

  if (!email) {
    redirect({ href: "/register", locale });
  }

  return <VerifyOtpForm email={email!} />;
}
