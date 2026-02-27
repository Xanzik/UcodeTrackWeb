import type { SelectProps } from "@/shared/ui/Select/Select.props.ts";
import cn from "classnames";
import styles from "./Select.module.css";

export function Select({ options, placeholder, ...props }: SelectProps) {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className={cn(styles["select"], props.className)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
