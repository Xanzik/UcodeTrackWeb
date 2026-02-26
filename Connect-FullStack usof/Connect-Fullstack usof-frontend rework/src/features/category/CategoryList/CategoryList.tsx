import styles from "./CategoryList.module.css";
import type { CategoryListProps } from "@/features/category/CategoryList/CategoryList.props.ts";
import { Category } from "@/entities/category/ui/Category";

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className={styles["category__list"]}>
      {categories.map((category) => (
        <Category category={category} key={category.id} />
      ))}
    </div>
  );
}
