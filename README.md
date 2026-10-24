<div align="center">

<img src="https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg" width="120" alt="Next.js Logo" />

# 🎓 Learnino

### A bilingual, production-grade e-learning platform frontend

**Learnino** is a full-featured, SEO-optimized Next.js frontend for an online course marketplace — built with a modern stack, first-class Persian (RTL) & English (LTR) support, a polished UI/UX design system, and a complete admin dashboard.

<br />

<img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
<img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />

<br />

<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
<img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logoColor=white" alt="Zustand" />
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
<img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
<img src="https://img.shields.io/badge/Tiptap_Editor-1A1A2E?style=for-the-badge&logoColor=white" alt="TipTap" />
<img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge" alt="Recharts" />

<br />

<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
<img src="https://img.shields.io/badge/next--intl-000000?style=for-the-badge&logoColor=white" alt="next-intl" />
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />

<br />

<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />

<br />
<br />

<a href="https://learnino.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌐_Live_Site-learnino.vercel.app-4f46e5?style=for-the-badge" alt="Live Site" />
</a>
<a href="https://github.com/AbbasRostami/Course-Shop-Express-JS" target="_blank">
  <img src="https://img.shields.io/badge/🔌_Backend_API-Course--Shop--Express--JS-433E38?style=for-the-badge" alt="Backend API" />
</a>

<br />
<br />

<a href="https://github.com/AbbasRostami/learnino/issues">
  <img src="https://img.shields.io/badge/Report_Bug-dc2626?style=for-the-badge" alt="Report Bug" />
</a>
<a href="https://github.com/AbbasRostami/learnino/issues">
  <img src="https://img.shields.io/badge/Request_Feature-4f46e5?style=for-the-badge" alt="Request Feature" />
</a>
<a href="https://github.com/AbbasRostami/learnino">
  <img src="https://img.shields.io/badge/⭐_Star_Repo-facc15?style=for-the-badge" alt="Star this repo" />
</a>

</div>

---

## 📋 Table of Contents

- [🎯 About](#-about)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🏛️ Architecture](#-architecture)
- [🌍 Internationalization & RTL](#-internationalization--rtl)
- [🔐 Authentication & Route Protection](#-authentication--route-protection)
- [🎨 Design System & Theming](#-design-system--theming)
- [🔍 SEO & Performance](#-seo--performance)
- [📊 State Management & Data Fetching](#-state-management--data-fetching)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [🌐 Environment Variables](#-environment-variables)
- [📝 Available Scripts](#-available-scripts)
- [🧪 Testing](#-testing)
- [🐳 Docker & Deployment](#-docker--deployment)
- [⚙️ CI/CD Pipeline](#️-cicd-pipeline)
- [🔌 Backend](#-backend)
- [🤝 Contributing](#-contributing)

---

## 🎯 About

**Learnino** is the frontend of a full-stack online educational e-commerce platform. Students browse, purchase, and enroll in programming courses; administrators manage content, users, discounts, and monitor platform analytics through a dedicated admin panel.

The platform is fully **bilingual** (Persian / English) with native **RTL/LTR** layout switching, a **dark/light theme** with system detection, and a **responsive** design that works from mobile to desktop. Every page is built with SEO best practices — structured data (JSON-LD), Open Graph, Twitter cards, dynamic sitemaps, and a robots policy that protects private routes while indexing public content.

The UI/UX design was crafted from scratch — the visual language, component styling, color tokens, and layout system are all custom-designed for the Learnino brand.

---

## ✨ Features

### 🌐 Public Site
- **Home page** — Hero section, category showcase, featured & free course carousels, teacher highlights, learning paths, blog teasers, testimonials, and CTA
- **Course catalog** — Filterable, paginated course listing with search, category, and level filters
- **Course detail** — Full course info, teacher bio, comments with nested replies, like/dislike reactions, enroll and add-to-cart actions
- **Blog** — Paginated post listing with rich-text content rendering (sanitized HTML), category filtering, and individual post pages
- **Teacher profiles** — Instructor pages with bio, avatar, and associated courses
- **Learning paths** — Curated learning tracks with step-by-step course sequences
- **About page** — Platform story and mission
- **Shopping cart** — Persistent cart per user, add/remove courses, apply discount codes, guest cart support that syncs on login
- **Payment flows** — Zarinpal gateway redirect and wallet-based checkout, success/failure result pages
- **Global search** — Cross-entity search across courses and blog posts

### 🔑 Authentication
- Login, registration, and email verification with OTP code input
- Forgot password and reset password flows
- Change email and change password flows
- Separate admin login page with role-based redirect
- JWT tokens managed via HttpOnly cookies with automatic refresh on 401

### 📊 Student Dashboard
- Profile overview with enrollment stats
- My courses — enrolled courses list
- Order history with cancellation
- Wallet — balance, charge via Zarinpal, full transaction history (Jalali/Persian calendar dates)
- Favorites — bookmarked courses and blog posts
- Comments — user's own comment history
- Settings — profile update with avatar upload

### 🛡️ Admin Panel
- **Dashboard overview** — Revenue, user, course, order, enrollment, and engagement stats with charts
- **Courses** — Full CRUD with image upload, publish toggle, pagination, and filtering
- **Categories** — CRUD with visibility toggle
- **Teachers** — CRUD with avatar upload
- **Blog posts** — CRUD with rich-text editor (TipTap), image upload, publish toggle
- **Comments** — Moderation queue with approve/reject actions
- **Users** — List, search, ban/unban management
- **Discounts** — Create, toggle, and delete discount codes
- **Orders** — View all orders with admin cancellation
- **Wallets** — View all user wallets and transactions

### ⚡ Platform-Wide
- 🌍 **Bilingual** — Persian (RTL) and English (LTR) with `next-intl`, fully translated UI
- 🎨 **Dark/Light theme** — System-detected with manual toggle, no flash of wrong theme
- 📱 **Responsive** — Mobile-first design with adaptive layouts and mobile detection hooks
- 🔍 **SEO-optimized** — Metadata, sitemap, robots, JSON-LD structured data, Open Graph, Twitter cards
- ⚡ **React Compiler** — Enabled with cache components for automatic optimization
- 🖼️ **Image optimization** — Next.js Image with Cloudinary remote patterns and quality presets
- 🛡️ **Security headers** — X-Frame-Options, HSTS, Content-Type-Options, Permissions-Policy, Referrer-Policy
- 📦 **PWA-ready** — Web app manifest with maskable icons
- 🔔 **Toast notifications** — Sonner with locale-aware positioning
- 🎬 **Smooth animations** — Framer Motion for page transitions, hover effects, and scroll reveals
- 🧼 **HTML sanitization** — Isomorphic DOMPurify for safe rich-text rendering
- 📅 **Jalali calendar** — Persian date formatting via jalaali-js

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 | App Router, RSC, image optimization, middleware |
| **Language** | TypeScript 5 | Type-safe development (strict mode) |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with `@theme` tokens |
| **Component System** | shadcn/ui v4 (base-nova) | 50+ accessible primitives, RTL-enabled |
| **Internationalization** | next-intl 4 | Bilingual (fa/en) with locale routing |
| **Data Fetching** | TanStack Query 5 | Server-state caching, mutations, devtools |
| **API Client** | up-fetch 2 | Fetch wrapper with auto token refresh |
| **State Management** | Zustand 5 | Auth state with persist middleware |
| **URL State** | nuqs 2 | Type-safe URL query parameter management |
| **Forms** | react-hook-form 7 | Performant form handling |
| **Validation** | Zod 4 | Schema validation for forms and inputs |
| **Rich Text Editor** | TipTap 3 | Blog post editor with 15+ extensions |
| **Animations** | Framer Motion 13 | Page transitions and micro-interactions |
| **Charts** | Recharts 3 | Admin dashboard analytics visualizations |
| **Carousels** | Embla Carousel 8 | Autoplay-enabled course/teacher carousels |
| **Theming** | next-themes 0.4 | Dark/light mode with system detection |
| **Icons** | lucide-react + react-icons | Comprehensive icon sets |
| **Toasts** | sonner 2 | Rich, accessible notifications |
| **JWT** | jose 6 | Edge-compatible JWT verification in middleware |
| **HTML Sanitization** | isomorphic-dompurify 4 | Safe rich-text rendering |
| **Date Formatting** | jalaali-js 2 | Persian/Jalali calendar conversion |
| **Command Palette** | cmdk 1 | Searchable command interface |
| **Resizable Panels** | react-resizable-panels 4 | Adjustable panel layouts |
| **Compiler** | babel-plugin-react-compiler 1.0 | Automatic memoization & optimization |
| **Unit Testing** | Vitest 5 | Fast test runner with jsdom |
| **Component Testing** | Testing Library | User-event interaction testing |
| **API Mocking** | MSW 3 | Mock Service Worker for test isolation |
| **E2E Testing** | Cypress 16 | End-to-end browser automation |
| **Linting** | ESLint 9 + eslint-config-next | Code quality and Next.js best practices |
| **Package Manager** | pnpm 12 | Fast, disk-efficient package management |
| **Containerization** | Docker | Multi-stage build with standalone output |
| **CI/CD** | GitHub Actions | Automated test and build pipeline |

---

## 📁 Project Structure

```
learnino/
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (site)/                    # Public website
│   │   │   │   ├── layout.tsx             # Navbar + Footer
│   │   │   │   ├── page.tsx               # Home page
│   │   │   │   ├── about/
│   │   │   │   ├── blog/                  # Blog list + [slug] detail
│   │   │   │   ├── cart/                  # Shopping cart
│   │   │   │   ├── courses/               # Course list + [slug] detail
│   │   │   │   ├── learning-paths/
│   │   │   │   └── teachers/              # Teacher list + [slug] profile
│   │   │   │
│   │   │   ├── (auth)/                    # Authentication pages
│   │   │   │   ├── layout.tsx             # Centered blurred-bg card
│   │   │   │   ├── forgot-password/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── verify-email/
│   │   │   │
│   │   │   ├── (dashboard)/               # Student dashboard
│   │   │   │   ├── layout.tsx             # DashboardLayoutClient
│   │   │   │   └── dashboard/
│   │   │   │       ├── page.tsx           # Overview
│   │   │   │       ├── comments/
│   │   │   │       ├── favorites/
│   │   │   │       ├── my-courses/
│   │   │   │       ├── orders/
│   │   │   │       ├── profile/
│   │   │   │       ├── settings/
│   │   │   │       └── wallet/
│   │   │   │
│   │   │   ├── (admin)/                   # Admin panel
│   │   │   │   ├── layout.tsx             # AdminLayoutClient
│   │   │   │   └── admin/
│   │   │   │       ├── page.tsx           # Dashboard overview
│   │   │   │       ├── categories/
│   │   │   │       ├── comments/
│   │   │   │       ├── courses/
│   │   │   │       ├── discounts/
│   │   │   │       ├── orders/
│   │   │   │       ├── posts/
│   │   │   │       ├── teachers/
│   │   │   │       ├── users/
│   │   │   │       └── wallets/
│   │   │   │
│   │   │   ├── admin-login/               # Separate admin login
│   │   │   ├── payment/                    # Payment result (success/failed)
│   │   │   ├── error.tsx                   # Client error boundary
│   │   │   ├── not-found.tsx               # 404 page
│   │   │   └── layout.tsx                 # Root locale layout (providers + fonts)
│   │   │
│   │   ├── globals.css                    # Tailwind v4 theme + design tokens
│   │   ├── manifest.ts                     # PWA web app manifest
│   │   ├── robots.ts                       # Dynamic robots.txt
│   │   └── sitemap.ts                      # Dynamic sitemap (courses, posts, teachers)
│   │
│   ├── components/
│   │   ├── ui/                             # 50+ shadcn/ui primitives
│   │   ├── shared/                         # AppBreadcrumb, Carousel, SafeHtml
│   │   ├── layout/                         # Navbar, Footer
│   │   ├── providers/                      # QueryProvider, ThemeProvider
│   │   ├── seo/                            # JSON-LD (Organization, Course, Article, etc.)
│   │   ├── site/                           # Home page sections (hero, courses, teachers...)
│   │   ├── auth/                           # Login/register form components
│   │   ├── admin/                          # Admin panel components
│   │   ├── dashboard/                      # Student dashboard components
│   │   ├── blog/                           # Blog list & detail components
│   │   ├── cart/                           # Cart components
│   │   ├── courses/                        # Course list & detail components
│   │   ├── learning-paths/                # Learning path components
│   │   ├── teachers/                       # Teacher components
│   │   ├── payment/                        # Payment result components
│   │   ├── about/                          # About page components
│   │   └── skeleton/                       # Loading skeletons
│   │
│   ├── hooks/                              # useIsMobile, useGuestCart, useLocale,
│   │                                       # useDebouncedParam, useAdminTableParams
│   │
│   ├── i18n/
│   │   ├── routing.ts                      # Locale config + navigation helpers
│   │   ├── request.ts                      # next-intl request config
│   │   └── messages/
│   │       ├── fa.json                     # Persian translations
│   │       └── en.json                     # English translations
│   │
│   ├── lib/
│   │   ├── utils.ts                        # cn() class merge utility
│   │   ├── upfetch.ts                      # API client with auto token refresh
│   │   ├── seo/                            # SEO config & metadata helpers
│   │   ├── category-icons.ts               # Category icon mappings
│   │   ├── learning-paths.ts               # Learning path definitions
│   │   └── testimonials.ts                 # Testimonial data
│   │
│   ├── schemas/                            # Zod validation schemas by domain
│   │
│   ├── services/                           # React Query hooks by domain
│   │   ├── auth/                            # login, register, refresh, verify, etc.
│   │   ├── course/                          # CRUD, publish toggle
│   │   ├── cart/                            # add, remove, clear, discount
│   │   ├── order/                           # checkout, history, cancel
│   │   ├── wallet/                          # balance, charge, transactions
│   │   ├── enrollment/                      # enroll, my courses
│   │   ├── comment/                         # create, moderate, reactions
│   │   ├── post/                            # blog CRUD, editor upload
│   │   ├── category/                        # CRUD, visibility toggle
│   │   ├── teacher/                         # CRUD, visibility toggle
│   │   ├── user/                            # profile, ban/unban
│   │   ├── discount/                        # create, toggle, delete
│   │   ├── favorite/                        # toggle, my favorites
│   │   ├── reaction/                       # like/dislike
│   │   ├── search/                          # global search
│   │   └── overview/                        # admin dashboard stats
│   │
│   ├── store/
│   │   ├── authStore.ts                    # Zustand auth state (persisted)
│   │   └── AdminSidebarContext.tsx         # Admin sidebar UI context
│   │
│   ├── types/                              # TypeScript types by domain
│   ├── utils/                              # formatters, formData helpers
│   ├── proxy.ts                            # Next.js middleware (i18n + JWT auth)
│   └── __tests__/                          # Vitest unit & integration tests
│
├── cypress/
│   ├── e2e/                                # E2E test specs
│   │   ├── auth/                            # login, register
│   │   ├── cart/                            # add-to-cart, checkout
│   │   └── courses/                         # course-detail, courses-list
│   ├── support/                            # commands.ts, e2e.ts
│   └── fixtures/                           # test data
│
├── public/
│   ├── fonts/Dana.ttf                      # Persian font (local)
│   └── logo/                               # Brand logos (EN/FA, light/dark)
│
├── .github/workflows/ci.yml                # GitHub Actions CI pipeline
├── Dockerfile                              # Multi-stage production build
├── docker-compose.yml                      # Docker Compose config
├── next.config.ts                          # Next.js config (intl, rewrites, headers)
├── eslint.config.mjs                       # ESLint config
├── postcss.config.mjs                      # PostCSS (Tailwind v4)
├── components.json                          # shadcn/ui config (base-nova, RTL)
├── cypress.config.ts                        # Cypress config
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json                           # TypeScript strict config
```

### Module Convention

Each feature domain (services, schemas, types) follows a consistent, scalable structure:

```
services/<domain>/
├── use<Action>.ts          # React Query hook (useQuery / useMutation)
└── ...

schemas/<domain>/
├── <entity>.schema.ts      # Zod schema for form/input validation
└── ...

types/<domain>/
├── <entity>.types.ts       # TypeScript interfaces & type definitions
└── ...
```

All services are re-exported from a single barrel file (`src/services/index.ts`), making imports clean:

```ts
import { useCourses, useLogin, useAddToCart } from "@/services";
```

---

## 🏛️ Architecture

### Route Groups

The App Router uses four route groups, each with its own layout and access level:

| Group | Purpose | Access | Layout |
|---|---|---|---|
| `(site)` | Public-facing pages | Everyone | Navbar + Footer |
| `(auth)` | Login, register, password reset | Guests only | Centered card with blurred bg |
| `(dashboard)` | Student area | Authenticated users | Sidebar dashboard shell |
| `(admin)` | Admin panel | ADMIN / SUPER_ADMIN | Admin sidebar shell |

### Provider Stack

The root locale layout wraps the entire app in a layered provider chain:

```
QueryProvider              ← TanStack Query client
  └─ NextIntlClientProvider  ← i18n messages
      └─ DirectionProvider      ← RTL/LTR direction context
          └─ ThemeProvider          ← Dark/light theme
              └─ NuqsAdapter           ← URL state
```

### Middleware (Edge)

`src/proxy.ts` acts as the Next.js middleware. It runs on every page request and handles two concerns:

1. **Internationalization** — `next-intl` middleware handles locale routing and cookie management
2. **Authentication** — JWT verification via `jose` at the edge:
   - Public routes (login, register, admin-login) bypass auth checks
   - `/admin` routes require a valid `accessToken` with role `ADMIN` or `SUPER_ADMIN`
   - `/dashboard` routes require authentication
   - If `accessToken` is expired but `refreshToken` exists, the request continues (client-side refresh handles it)
   - Unauthenticated users are redirected to the appropriate login page

### API Client

`src/lib/upfetch.ts` is the centralized API client built on `up-fetch`. Key features:

- **Auto token refresh** — On 401, automatically calls `/auth/refresh` with single-flight deduplication
- **Session expiry handling** — Clears auth state and redirects home when refresh fails
- **Locale injection** — Sends `Accept-Language` header based on current locale
- **Environment-aware** — Server uses absolute backend URL; client uses `/api` proxy (via Next.js rewrites)
- **Timeout** — 6s on server, 50s on client
- **Error parsing** — Extracts localized error messages from API responses

### Service Layer

Every API interaction is a React Query hook in `src/services/`. This provides:

- Automatic caching and background refetching
- Optimistic updates for mutations
- Loading/error states handled declaratively
- DevTools integration for debugging server state

---

## 🌍 Internationalization & RTL

Learnino is fully bilingual with **Persian (fa)** as the default locale and **English (en)** as a secondary locale.

- **Routing** — Locale is part of the URL (`/fa/courses`, `/en/courses`) via `next-intl` routing
- **Direction** — Persian uses RTL, English uses LTR, handled by `DirectionProvider`
- **Fonts** — Dana (local, Persian) and Inter (Google, English) loaded with `next/font`
- **Translations** — All UI strings in `src/i18n/messages/fa.json` and `en.json`
- **Cookie persistence** — Locale preference stored in `NEXT_LOCALE` cookie (1 year expiry)
- **Locale-aware UI** — Toast position, date formats, and layout directions adapt automatically

```tsx
// Navigation helpers typed for locale routing
import { Link, useRouter, usePathname, redirect } from "@/i18n/routing";
```

---

## 🔐 Authentication & Route Protection

Authentication is handled through a dual-token JWT system integrated with the backend:

| Token | Storage | Lifetime | Purpose |
|---|---|---|---|
| `accessToken` | HttpOnly cookie | Short | API authentication |
| `refreshToken` | HttpOnly cookie | Long | Obtain new access token |

**Flow:**
1. Login/register sets both cookies via the backend
2. Middleware (`proxy.ts`) verifies the access token at the edge using `jose`
3. If the access token expires, the API client (`upfetch.ts`) automatically refreshes it using the refresh token — with single-flight deduplication to avoid duplicate refresh calls
4. If both tokens are invalid, the user is redirected to login and auth state is cleared

**Role-based access:**

| Role | Access |
|---|---|
| `USER` | Student dashboard, courses, cart, wallet, profile |
| `ADMIN` | Read-only admin panel + comment moderation |
| `SUPER_ADMIN` | Full admin panel — all CRUD operations |

---

## 🎨 Design System & Theming

### Design Tokens

The theme is defined in `globals.css` using Tailwind v4's `@theme` directive with `oklch` color space:

- **Primary** — Indigo 600 (`oklch`)
- **Accent** — Violet / brand-accent
- **Destructive** — Red 600
- **Radius** — 0.75rem (consistent across all components)

### Dark / Light Mode

- Powered by `next-themes` with `class` strategy
- Defaults to **system** preference
- `suppressHydrationWarning` on `<html>` prevents flash of wrong theme
- `disableTransitionOnChange` for instant theme switching

### Component Library

50+ shadcn/ui primitives configured with the **base-nova** style, RTL support, and CSS variables for theming. Components are fully accessible (ARIA-compliant) and keyboard-navigable.

### Custom Components

| Component | Purpose |
|---|---|
| `SafeHtml` | Renders sanitized HTML (DOMPurify) for blog content |
| `Carousel` | Embla-powered carousel with autoplay |
| `AppBreadcrumb` | Locale-aware breadcrumb navigation |
| JSON-LD components | Structured data for Organization, WebSite, Course, Article, Breadcrumb |

---

## 🔍 SEO & Performance

### Metadata

Every page generates rich metadata via `generateMetadata`:

- **Title templates** — `%s | Learnino` pattern
- **Open Graph** — Social sharing cards with brand images
- **Twitter cards** — Summary large image format
- **Alternates** — `hreflang` tags for fa/en locales + `x-default`
- **Robots** — Public pages indexable; private routes (admin, dashboard, cart, payment) blocked

### Structured Data (JSON-LD)

| Type | Used On |
|---|---|
| `Organization` | Site-wide |
| `WebSite` | Home page |
| `Course` | Course detail pages |
| `Article` | Blog post pages |
| `BreadcrumbList` | All nested pages |

### Dynamic Sitemap & Robots

- `sitemap.ts` — Fetches courses, posts, and teachers from the API and generates localized URLs with `hreflang` alternates
- `robots.ts` — Allows public routes, blocks private routes and AI crawlers (GPTBot, CCBot, anthropic-ai)

### Performance Optimizations

- **React Compiler** — Enabled with `reactCompiler: true` and `cacheComponents: true` for automatic memoization
- **Image optimization** — Cloudinary remote patterns with quality presets (65–90)
- **Standalone output** — Optimized Docker builds with minimal production image
- **Code splitting** — App Router automatic per-route code splitting
- **Font optimization** — `next/font` with `display: swap`

### Security Headers

```
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

## 📊 State Management & Data Fetching

| Concern | Tool | Location |
|---|---|---|
| Server state (API data) | TanStack Query 5 | `src/services/` |
| Auth state | Zustand 5 (persisted) | `src/store/authStore.ts` |
| URL query params | nuqs 2 | Admin tables, filters, pagination |
| Form state | react-hook-form 7 | All forms |
| Form validation | Zod 4 | `src/schemas/` |
| Admin sidebar UI | React Context | `src/store/AdminSidebarContext.tsx` |

The auth store uses Zustand's `persist` middleware with the key `"auth-storage"`, tracking `isAuthenticated` state that the API client updates on login, logout, and token refresh failure.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** `>= 20.0.0`
- **pnpm** `>= 12.0.0` — install with `npm install -g pnpm`
- The **[Learnino backend](https://github.com/AbbasRostami/Course-Shop-Express-JS)** running locally or a deployed instance

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AbbasRostami/learnino.git
cd learnino

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env .env.local
# Edit .env.local with your actual values (see Environment Variables below)

# 4. Start the development server
pnpm run dev
```

The app will start on `http://localhost:3000`.

> **Note:** The development server proxies `/api/*` requests to the backend specified by `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:5000`). Make sure the backend is running.

> **Tip:** The default locale is Persian (`fa`). Visit `http://localhost:3000/en` for the English version.

> **Warning:** Never commit your `.env` file. It contains secrets like JWT keys.

---

## 🌐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL (e.g. `http://localhost:5000`) | ✅ |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL for SEO and metadata (e.g. `https://learnino.vercel.app`) | ✅ |
| `JWT_ACCESS_SECRET` | JWT secret for middleware token verification (must match backend) | ✅ |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification token | ⚠️ Optional |

> **Note:** `NEXT_PUBLIC_*` variables are exposed to the browser and must be set at build time. For Docker builds, pass them as build args.

---

## 📝 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `pnpm run dev` | Start Next.js dev server with hot reload |
| **Build** | `pnpm run build` | Production build |
| **Start** | `pnpm run start` | Start production server |
| **Lint** | `pnpm run lint` | Run ESLint |
| **Test** | `pnpm run test` | Run Vitest in watch mode |
| **Test (single run)** | `pnpm run test:run` | Run all tests once |
| **Test UI** | `pnpm run test:ui` | Open Vitest browser UI |
| **Test coverage** | `pnpm run test:coverage` | Run tests with coverage report |
| **Test watch** | `pnpm run test:watch` | Watch mode for development |
| **Cypress open** | `pnpm run cy:open` | Open Cypress interactive runner |
| **Cypress run** | `pnpm run cy:run` | Run E2E tests headless |
| **Cypress headed** | `pnpm run cy:run:headed` | Run E2E tests in browser |
| **E2E tests** | `pnpm run test:e2e` | Alias for `cypress run` |
| **All tests** | `pnpm run test:all` | Run Vitest + Cypress sequentially |

---

## 🧪 Testing

The project has a comprehensive testing setup with two layers:

### Unit & Integration Tests (Vitest)

- **Runner:** Vitest 5 with jsdom environment
- **Testing Library:** `@testing-library/react` + `@testing-library/user-event`
- **API Mocking:** MSW (Mock Service Worker) for isolated network calls
- **Setup:** `vitest.setup.ts` with Testing Library matchers

```bash
# Run all tests once
pnpm run test:run

# Watch mode during development
pnpm run test:watch

# With coverage report
pnpm run test:coverage
```

### End-to-End Tests (Cypress)

- **Version:** Cypress 16
- **Specs:** Auth (login, register), Cart (add-to-cart, checkout), Courses (list, detail)
- **Fixtures:** Test user credentials in `cypress/fixtures/user.json`
- **Config:** 1280×720 viewport, 10s command timeout, 2 retries in run mode

```bash
# Interactive mode (opens Cypress app)
pnpm run cy:open

# Headless mode
pnpm run cy:run

# Headed browser mode
pnpm run cy:run:headed
```

> **Note:** E2E tests require the dev server running on `http://localhost:3000`. The test account is `test@learnino.com` / `Test@123456`.

---

## 🐳 Docker & Deployment

### Docker

The project ships with a multi-stage `Dockerfile` optimized for production:

```
Stage 1 (deps)    → Install dependencies (frozen lockfile)
Stage 2 (builder) → Build Next.js (standalone output)
Stage 3 (runner)  → Minimal production image (non-root user)
```

**Build & run with Docker:**

```bash
# Build the image (pass public env vars as build args)
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=https://learnino.vercel.app \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://course-shop-api.onrender.com \
  -t learnino .

# Run the container
docker run -p 3000:3000 learnino
```

**Or use Docker Compose:**

```bash
docker-compose up --build
```

> **Note:** `JWT_ACCESS_SECRET` is a server-side secret and should be passed at runtime, not build time. Set it in your deployment environment (e.g. Vercel env vars, Docker `-e` flag).

### Vercel (Recommended)

The easiest deployment path is [Vercel](https://vercel.com):

1. Push your repo to GitHub
2. Import the project in Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

---

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `main`/`master`:

```
Checkout → Setup pnpm → Setup Node 22 → Install (frozen-lockfile) → Test (vitest) → Build (Next.js)
```

The pipeline ensures:
- ✅ All unit and integration tests pass
- ✅ The production build succeeds without errors
- ✅ Dependencies are locked via `pnpm-lock.yaml`

---

## 🔌 Backend

This frontend is designed to work with the **[Course Shop Express JS](https://github.com/AbbasRostami/Course-Shop-Express-JS)** backend — a production-ready Express 5 + TypeScript + Prisma + PostgreSQL API.

The backend provides:
- JWT authentication (access + refresh tokens via HttpOnly cookies)
- Course, category, and teacher management
- Shopping cart, orders, and Zarinpal payment integration
- Wallet system with transaction history
- Blog posts with comments, reactions, and favorites
- Admin dashboard analytics
- Swagger/OpenAPI documentation at `/api-docs`

API requests are proxied through Next.js rewrites (`/api/:path*` → backend) in development, and directed to the absolute backend URL in production.

---

## 🤝 Contributing

Contributions are welcome. Please follow this workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please ensure your code passes linting and all tests before submitting a PR:

```bash
# Lint
pnpm run lint

# Run tests
pnpm run test:run

# Build
pnpm run build
```

---

<div align="center">

**Made with ❤️ by [Abbas Rostami](https://github.com/AbbasRostami)**

UI/UX design & full-stack development

⭐ If you find this project useful, please [star the repo](https://github.com/AbbasRostami/learnino)!

</div>
