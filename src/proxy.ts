import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.match(/^\/(?:fa|en)\/admin(?:\/.*)?$/) &&
    !pathname.includes("/admin-login");

  if (isAdminRoute) {
    const locale = pathname.startsWith("/en") ? "en" : "fa";

    const token =
      request.cookies.get("accessToken")?.value ||
      request.cookies.get("token")?.value;

    if (!token) {
      console.log("🚩 [Proxy Check]: No token found. Redirecting to login.");
      return NextResponse.redirect(
        new URL(`/${locale}/admin-login`, request.url),
      );
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      console.log("🔑 [Proxy Check]: Decrypted JWT Payload:", payload);

      const userRole = payload?.role?.toString().toUpperCase();

      if (userRole !== "ADMIN") {
        console.log(
          `⚠️ [Proxy Check]: Access Denied! Role is: ${userRole}. Redirecting to Home.`,
        );
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }

      console.log("✅ [Proxy Check]: Access Granted for ADMIN.");
    } catch (error: any) {
      console.error(
        "❌ [Proxy Check]: JWT Verification Failed:",
        error.message,
      );
      const response = NextResponse.redirect(
        new URL(`/${locale}/admin-login`, request.url),
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("token");
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
