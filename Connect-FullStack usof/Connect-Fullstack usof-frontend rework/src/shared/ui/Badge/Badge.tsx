import type { ReactNode } from "react";
import cn from "classnames";
import styles from "./Badge.module.css";

export function Badge({ children }: { children: ReactNode }) {
  return <div className={cn(styles["badge"])}>{children}</div>;
}
