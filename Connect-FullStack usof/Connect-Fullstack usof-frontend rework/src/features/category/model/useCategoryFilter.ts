import { useQueryState } from "@/app/hooks";

export function useCategoryParam(paramName: string) {
  return useQueryState(
    paramName,
    (v) => (v ? v.split(",").filter(Boolean) : []),
    (v) => (v.length ? v.join(",") : null),
  );
}
