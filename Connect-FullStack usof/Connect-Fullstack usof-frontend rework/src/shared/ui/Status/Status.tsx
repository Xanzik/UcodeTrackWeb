import type { StatusProps } from "@/shared/ui/Status/Status.props.ts";
import cn from "classnames";
import styles from "./Status.module.css";

export function Status({ text, status }: StatusProps) {
  return (
    <div className={cn(styles["status"])}>
      <div className={cn(styles["dot"], styles[`dot__${status}`])} />
      {text}
    </div>
  );
}
