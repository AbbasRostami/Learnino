import LoginForm from "@/components/auth/login/LoginForm";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

async function LoginContent({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;
  return <LoginForm redirectTo={redirectTo === "/cart" ? "/cart" : "/"} />;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
