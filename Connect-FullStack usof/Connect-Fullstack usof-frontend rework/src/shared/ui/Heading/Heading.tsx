import styles from "./Heading.module.css";
import cn from "classnames";
import type { HeadingProps } from "@/shared/ui/Heading/Heading.props.ts";

export function Heading({ children, className = "", ...props }: HeadingProps) {
  return (
    <h1 className={cn(styles["head"], className)} {...props}>
      {children}
    </h1>
  );
}
