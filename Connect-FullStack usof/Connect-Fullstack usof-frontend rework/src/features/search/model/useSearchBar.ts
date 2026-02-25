import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

export function useSearchBar(paramName = "q") {
  const [params, setParams] = useSearchParams();
  const urlValue = useMemo(
    () => params.get(paramName) ?? "",
    [params, paramName],
  );
  const [value, setValue] = useState(urlValue);
  const submit = () => {
    const copy = new URLSearchParams(params);
    if (value.trim()) {
      copy.set(paramName, value.trim());
    } else {
      copy.delete(paramName);
    }
    copy.delete("page");
    setParams(copy);
  };
  return { value, setValue, submit, urlValue };
}
