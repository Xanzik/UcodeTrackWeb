import { Input } from "@/shared/ui/Input";
import styles from "./Search.module.css";
import type { SubmitEvent } from "react";
import type { SearchProps } from "./Search.props";

export function Search({
  value,
  onChange,
  onSubmit,
  placeholder,
}: SearchProps) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className={styles["search__form"]} onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        startSlot={
          <span className={styles["search__icon"]} aria-hidden="true">
            ⌕
          </span>
        }
        placeholder={placeholder}
      />
    </form>
  );
}
