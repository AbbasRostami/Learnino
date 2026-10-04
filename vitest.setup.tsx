import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string, params?: any) => {
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
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
}));

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

vi.mock("next/image", () => ({
  default: (props: any) => {
    const { fill, sizes, priority, quality, ...rest } = props;
    return <img {...rest} alt={props.alt || ""} />;
  },
}));

vi.mock("motion/react", () => {
  const mockComponent = (props: any) => {
    const { animate, initial, exit, transition, ...rest } = props;
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

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn((selector?: any) => {
    const state = {
      isAuthenticated: false,
      setAuthenticated: vi.fn(),
      resetAuth: vi.fn(),
    };
    return selector ? selector(state) : state;
  }),
}));

vi.mock("@/services", () => ({
  useLogin: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useRegister: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useVerifyEmail: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useResendVerification: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCreateComment: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  usePostComments: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCommentReaction: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    variables: null,
  })),
  useSearch: vi.fn(() => ({ data: undefined, isLoading: false })),
  useCart: vi.fn(() => ({ data: undefined, isLoading: false })),
  useClearCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useRemoveFromCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useSyncCart: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useApplyDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCheckoutWallet: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useCheckoutZarinpal: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useWallet: vi.fn(() => ({ data: undefined })),
  useCategories: vi.fn(() => ({ data: undefined })),
  usePost: vi.fn(() => ({ data: undefined })),
  usePosts: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock("@/services/cart/useRemoveDiscount", () => ({
  useRemoveDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}));

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
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => "fa",
}));
