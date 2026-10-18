import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.startsWith("/en") ? "en" : "fa";

  if (
    pathname.includes("/admin-login") ||
    pathname.includes("/login") ||
    pathname.includes("/register")
  ) {
    return intlMiddleware(request);
  }

  const isAdminRoute = /^\/(?:fa|en)\/admin(?:\/.*)?$/.test(pathname);
  const isDashboardRoute = /^\/(?:fa|en)\/dashboard(?:\/.*)?$/.test(pathname);

  if (!isAdminRoute && !isDashboardRoute) {
    return intlMiddleware(request);
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const loginRedirectUrl = isAdminRoute
    ? `/${locale}/admin-login`
    : `/${locale}/login`;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL(loginRedirectUrl, request.url));
  }

  if (!accessToken) {
    return intlMiddleware(request);
  }

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    if (isAdminRoute) {
      const userRole = payload?.role?.toString().toUpperCase();
      if (!userRole || !ADMIN_ROLES.includes(userRole)) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
    }

    return intlMiddleware(request);
  } catch (error) {
    if (refreshToken) {
      return intlMiddleware(request);
    }

    const response = NextResponse.redirect(
      new URL(loginRedirectUrl, request.url),
    );
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
