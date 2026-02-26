import type { CategoryProps } from "@/entities/category/ui/Category/Category.props.ts";
import styles from "./Category.module.css";

export function Category({ category }: CategoryProps) {
  return <div className={styles["category"]}>{category.title}</div>;
}
