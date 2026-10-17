import { useDebouncedParam } from "@/hooks/useDebouncedParam";
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  type UseQueryStatesKeysMap,
} from "nuqs";

interface UseAdminTableParamsOptions<T extends UseQueryStatesKeysMap> {
  defaultLimit?: number;
  searchDebounceMs?: number;
  customParsers?: T;
}

function cleanParams<T extends Record<string, unknown>>(
  params: T,
): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (
      val !== "" &&
      val !== null &&
      val !== undefined &&
      (!Array.isArray(val) || val.length > 0)
    ) {
      cleaned[key] = val;
    }
  });
  return cleaned;
}

export function useAdminTableParams<
  TApiParams extends Record<string, unknown> = Record<string, unknown>,
  TParsers extends UseQueryStatesKeysMap = UseQueryStatesKeysMap,
>(options: UseAdminTableParamsOptions<TParsers> = {}) {
  const { defaultLimit = 10, searchDebounceMs = 400, customParsers } = options;

  const parsers = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(defaultLimit),
    search: parseAsString.withDefault(""),
    sortBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
    ...(customParsers as TParsers),
  };

  const [params, setParams] = useQueryStates(parsers, { shallow: true });

  type SetParamsArg = Parameters<typeof setParams>[0];
  type ParserKeys = keyof typeof parsers;

  const setPage = (page: number) =>
    setParams({ page } as unknown as SetParamsArg);

  const setLimit = (limit: number) =>
    setParams({ limit, page: 1 } as unknown as SetParamsArg);

  const setSearchUrl = (value: string | null) =>
    setParams({ search: value || null, page: 1 } as unknown as SetParamsArg);

  const [searchValue, setSearchValue] = useDebouncedParam(
    (params.search as string) ?? "",
    (val) => setSearchUrl(val),
    searchDebounceMs,
  );

  const setFilter = (
    key: ParserKeys,
    value: string | number | boolean | string[] | number[] | null | unknown,
  ) => {
    const isEmpty =
      value === "all" ||
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    setParams({
      [key]: isEmpty ? null : value,
      page: 1,
    } as unknown as SetParamsArg);
  };

  const setSort = (field: string) => {
    if (params.sortBy === field) {
      setParams({
        order: params.order === "asc" ? "desc" : "asc",
        page: 1,
      } as unknown as SetParamsArg);
    } else {
      setParams({
        sortBy: field,
        order: "desc",
        page: 1,
      } as unknown as SetParamsArg);
    }
  };

  const resetFilters = () => {
    const resetObj: Record<string, null | number | string> = {
      search: null,
      sortBy: "createdAt",
      order: "desc",
      page: 1,
    };

    if (customParsers) {
      Object.keys(customParsers).forEach((key) => {
        resetObj[key] = null;
      });
    }

    setParams(resetObj as unknown as SetParamsArg);
  };

  return {
    params,
    apiParams: cleanParams(params) as unknown as TApiParams,
    searchValue,
    setSearch: setSearchValue,
    setParams,
    setPage,
    setLimit,
    setFilter,
    setSort,
    resetFilters,
  };
}

export const useQueryParams = useAdminTableParams;
