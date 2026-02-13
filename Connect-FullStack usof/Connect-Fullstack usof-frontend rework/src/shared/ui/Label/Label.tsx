import type { LabelProps } from "@/shared/ui/Label/Label.props.ts";
import styles from "./Label.module.css";
import cn from "classnames";

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn(styles["label"], className)} {...props}>
      {children}
    </label>
  );
}
