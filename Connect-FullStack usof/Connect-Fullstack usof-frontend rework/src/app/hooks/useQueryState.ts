import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

export function useQueryState<T>(
  paramName: string,
  parse: (value: string | null) => T,
  serialize: (value: T) => string | null,
) {
  const [params, setParams] = useSearchParams();

  const value = useMemo(() => {
    return parse(params.get(paramName));
  }, [params, paramName, parse]);

  const setValue = useCallback(
    (next: T) => {
      const copy = new URLSearchParams(params);
      const serialized = serialize(next);

      if (serialized) copy.set(paramName, serialized);
      else copy.delete(paramName);

      copy.delete("page");
      setParams(copy);
    },
    [params, paramName, serialize, setParams],
  );

  return [value, setValue] as const;
}
