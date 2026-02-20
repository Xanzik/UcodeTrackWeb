import type { DividerProps } from "@/shared/ui/Divider/Dividers.props.ts";
import cn from "classnames";
import styles from "./Divider.module.css";

export function Divider({ className }: DividerProps) {
  return <div className={cn(styles["divider"], className)} />;
}
