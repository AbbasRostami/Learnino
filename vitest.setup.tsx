import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// 🌐 Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}`;
      return key;
    };
    t.rich = (key: string) => key;
    return t;
  },
  useLocale: () => "fa",
  getTranslations: async () => (key: string) => key,
}));

const mockPush = vi.fn();
const mockReplace = vi.fn();

// 🧭 Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/fa",
  useSearchParams: () => new URLSearchParams(),
}));

// 🧭 Mock @/i18n/routing
vi.mock("@/i18n/routing", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/fa",
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
}));

// 🔗 Mock nuqs
vi.mock("nuqs", () => ({
  useQueryState: vi.fn(() => {
    const [val, setVal] = React.useState("");
    return [val, setVal];
  }),
  useQueryStates: vi.fn(() => [
    { page: 1, search: "", category: "", sortBy: "createdAt" },
    vi.fn(),
  ]),
  parseAsString: {
    withDefault: () => ({
      withOptions: () => ({}),
    }),
  },
  parseAsInteger: {
    withDefault: () => ({}),
  },
}));

// 🖼️ Mock next/image
vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
      quality?: number;
    },
  ) => {
    const { fill, priority, quality, ...rest } = props;
    return <img {...rest} alt={props.alt || ""} />;
  },
}));

// 🎭 Mock motion/react
vi.mock("motion/react", () => {
  const mockComponent = (props: React.HTMLAttributes<HTMLElement>) => {
    const { ...rest } = props;
    return <div {...rest} />;
  };

  return {
    motion: {
      div: mockComponent,
      span: mockComponent,
      article: mockComponent,
      section: mockComponent,
      form: mockComponent,
    },
    useReducedMotion: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// 🔔 Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

// 🔑 Mock authStore
interface AuthStoreState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  resetAuth: () => void;
}

const mockResetAuth = vi.fn();
const mockSetAuthenticated = vi.fn();

vi.mock("@/store/authStore", () => ({
  useAuthStore: Object.assign(
    vi.fn((selector?: (state: AuthStoreState) => unknown) => {
      const state: AuthStoreState = {
        isAuthenticated: false,
        setAuthenticated: mockSetAuthenticated,
        resetAuth: mockResetAuth,
      };
      return selector ? selector(state) : state;
    }),
    {
      getState: () => ({
        isAuthenticated: false,
        setAuthenticated: mockSetAuthenticated,
        resetAuth: mockResetAuth,
      }),
    },
  ),
}));

// ⚙️ Mock UNIFIED @/services
vi.mock("@/services", () => ({
  // Auth
  useLogin: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useAdminLogin: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useRegister: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useVerifyEmail: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useResendVerification: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useForgotPassword: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useResetPassword: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),

  // Comments & Reactions
  useCreateComment: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  usePostComments: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCourseComments: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCommentReaction: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    variables: null,
  })),

  // Search
  useSearch: vi.fn(() => ({ data: undefined, isLoading: false })),

  // Cart & Orders
  useCart: vi.fn(() => ({ data: undefined, isLoading: false })),
  useClearCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useRemoveFromCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useSyncCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useApplyDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useRemoveDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCheckoutWallet: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCheckoutZarinpal: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useWallet: vi.fn(() => ({ data: undefined })),

  // Content & Categories
  useCategories: vi.fn(() => ({ data: undefined })),
  usePost: vi.fn(() => ({ data: undefined })),
  usePosts: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCourses: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCourse: vi.fn(() => ({ data: undefined, isLoading: false })),

  // Profile
  useProfile: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

// 🛠️ Mock formatters & helpers
vi.mock("@/utils/formatters", () => ({
  formatRelativeTime: () => "2 ساعت پیش",
  formatNumber: (n: number) => String(n),
  formatFullDate: () => "2024/06/15",
  formatShortDate: () => "2024/06/15",
}));

vi.mock("@/lib/category-icons", () => ({
  getCategoryStyle: () => ({
    badgeColor: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500/10 to-transparent",
  }),
}));

vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => "fa",
}));
