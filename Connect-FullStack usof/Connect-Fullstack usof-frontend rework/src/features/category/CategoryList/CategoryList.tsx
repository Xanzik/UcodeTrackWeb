import styles from "./CategoryList.module.css";
import type { CategoryListProps } from "@/features/category/CategoryList/CategoryList.props.ts";
import { Category } from "@/entities/category/ui/Category";
import cn from "classnames";

export function CategoryList({
  categories,
  selectedCategories,
  onCategoryClick,
  className,
}: CategoryListProps) {
  const selectedSet = new Set(selectedCategories);
  return (
    <div className={cn(styles["category__list"], className)}>
      {categories.map((category) => (
        <Category
          category={category}
          key={category.id}
          onClick={
            onCategoryClick ? () => onCategoryClick(category) : undefined
          }
          isSelected={selectedSet.has(category.title)}
        />
      ))}
    </div>
  );
}
