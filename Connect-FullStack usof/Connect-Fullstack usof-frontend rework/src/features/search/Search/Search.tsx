import { Input } from "@/shared/ui/Input";
import styles from "./Search.module.css";
import type { SearchProps } from "./Search.props";

export function Search({ value, onChange, placeholder }: SearchProps) {
  return (
    <form className={styles["search__form"]}>
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
