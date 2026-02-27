import type { CategoryProps } from "@/entities/category/ui/Category/Category.props.ts";
import cn from "classnames";
import styles from "./Category.module.css";

export function Category({ category, onClick, isSelected }: CategoryProps) {
  const isInteractive = Boolean(onClick);
  const Component: "button" | "div" = isInteractive ? "button" : "div";

  return (
    <Component
      type={isInteractive ? "button" : undefined}
      onClick={onClick}
      aria-pressed={isInteractive ? isSelected : undefined}
      className={cn(
        styles["category"],
        isInteractive && styles["category--interactive"],
        isSelected && styles["category--selected"],
      )}
    >
      {category.title}
    </Component>
  );
}
