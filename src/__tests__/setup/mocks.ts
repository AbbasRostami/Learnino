import { vi } from "vitest";

export const mockTranslator = (key: string, params?: Record<string, any>) => {
  if (params) return `${key}(${JSON.stringify(params)})`;
  return key;
};

export const createMockTranslator = () => mockTranslator as any;

export const createMockFile = (
  name = "test.jpg",
  size = 1024,
  type = "image/jpeg",
): File => {
  const content = new Array(size).fill("a").join("");
  return new File([content], name, { type });
};

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";
export const INVALID_UUID = "not-a-valid-uuid";

export const createMockMutation = (overrides = {}) => ({
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  isPending: false,
  isError: false,
  isSuccess: false,
  error: null,
  data: null,
  reset: vi.fn(),
  ...overrides,
});

export const createMockQuery = (overrides = {}) => ({
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
  ...overrides,
});
