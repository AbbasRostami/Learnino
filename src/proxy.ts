import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // این متچر جلوی اعمال شدن بر روی api روتر و فایل‌های استاتیک را می‌گیرد
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};