import { useQueryState } from "@/app/hooks";

export function useSearchParam(paramName: string) {
  return useQueryState(
    paramName,
    (v) => v ?? "",
    (v) => (v.trim() ? v.trim() : null),
  );
}
