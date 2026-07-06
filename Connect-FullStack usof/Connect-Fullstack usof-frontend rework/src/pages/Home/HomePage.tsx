import styles from "./HomePage.module.css";
import { PostList } from "@/features/posts/PostList";
import { Heading } from "@/shared/ui/Heading";
import { Subtitle } from "@/shared/ui/Subtitle";
import { Search } from "@/features/search/Search";
import { useGetAllPostsQuery } from "@/entities/post/api/postApi.ts";
import { Select } from "@/shared/ui/Select";
import { useGetAllCategoriesQuery } from "@/entities/category";
import { CategoryList } from "@/features/category/CategoryList/CategoryList.tsx";
import { useSearchParam } from "@/features/search/model/useSearchParam.ts";
import { useCategoryParam } from "@/features/category/model/useCategoryFilter.ts";

const SORT_OPTIONS_1 = [
  { label: "Date", value: "date" },
  { label: "Date2", value: "date2" },
] as const;

const SORT_OPTIONS_2 = [
  { label: "Like", value: "date" },
  { label: "Dislike", value: "date2" },
] as const;

export function HomePage() {
  const [searchCategories, setSearchCategories] =
    useCategoryParam("categories");
  const [postSearch, setPostSearch] = useSearchParam("post");
  const [categorySearch, setCategorySearch] = useSearchParam("categorySearch");
  const { data: posts } = useGetAllPostsQuery({
    search: postSearch,
    categories: searchCategories,
  });
  const { data: categories } = useGetAllCategoriesQuery(categorySearch);
  const toggleCategory = (title: string) => {
    const next = searchCategories.includes(title)
      ? searchCategories.filter((item) => item !== title)
      : [...searchCategories, title];
    setSearchCategories(next);
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["page__header"]}>
        <div className={styles["page__header-top"]}>
          <Heading>QUESTIONS</Heading>
          <Subtitle>USER POSTS & INQUIRIES</Subtitle>
        </div>
        <div className={styles["page__header-center"]}>
          <Search
            value={postSearch}
            onChange={setPostSearch}
            placeholder="Search posts..."
          />
          <Search
            value={categorySearch}
            onChange={setCategorySearch}
            placeholder="Search categories..."
          />
          <Select placeholder="Sort By" options={SORT_OPTIONS_1} />
          <Select placeholder="Sort By" options={SORT_OPTIONS_2} />
        </div>
        {categories && categories.length > 0 && (
          <CategoryList
            categories={categories}
            className={styles["page__categories"]}
            selectedCategories={searchCategories}
            onCategoryClick={(category) => toggleCategory(category.title)}
          />
        )}
      </div>
      {posts && <PostList posts={posts} />}
    </div>
  );
}
