import type { ICategory } from "@/entities/category/model/types.ts";

export interface CategoryListProps {
  categories: ICategory[];
  selectedCategories?: string[];
  onCategoryClick?: (category: ICategory) => void;
  className?: string;
}
