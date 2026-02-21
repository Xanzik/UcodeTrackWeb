import type { SubtitleProps } from "@/shared/ui/Subtitle/Subtitle.props.ts";
import cn from "classnames";
import styles from "./Subtitle.module.css";

export function Subtitle({
  children,
  className,
  variant = "dark",
}: SubtitleProps) {
  return (
    <p className={cn(styles["subtitle"], styles[variant], className)}>
      {children}
    </p>
  );
}
