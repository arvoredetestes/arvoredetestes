import merge from "lodash/merge";
import qs from "qs";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useQueryParams<
  T extends Record<string, string> = Record<string, string>
>(defaultValue: T = {} as T): T {
  const location = useLocation();
  return useMemo(() => {
    const result = qs.parse(location.search.replace("?", ""));
    return merge(defaultValue, result);
  }, [defaultValue, location.search]) as T;
}
