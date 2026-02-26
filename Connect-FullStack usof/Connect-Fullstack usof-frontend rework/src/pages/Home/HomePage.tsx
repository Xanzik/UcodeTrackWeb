import styles from "./HomePage.module.css";
import { PostList } from "@/features/posts/PostList";
import { Heading } from "@/shared/ui/Heading";
import { Subtitle } from "@/shared/ui/Subtitle";
import { Search } from "@/features/search/Search";
import { useGetAllPostsQuery } from "@/entities/post/api/postApi.ts";
import { useSearchBar } from "@/features/search/model/useSearchBar.ts";
import { Select } from "@/shared/ui/Select";
import { useGetAllCategoriesQuery } from "@/entities/category";
import { CategoryList } from "@/features/category/CategoryList/CategoryList.tsx";

export function HomePage() {
  const postSearch = useSearchBar("post");
  const categorySearch = useSearchBar("category");
  const { data: posts } = useGetAllPostsQuery(postSearch.value);
  const { data: categories } = useGetAllCategoriesQuery(categorySearch.value);
  return (
    <div className={styles["page"]}>
      <div className={styles["page__header"]}>
        <div>
          <Heading>QUESTIONS</Heading>
          <Subtitle>USER POSTS & INQUIRIES</Subtitle>
        </div>
        <div className={styles["page__header-center"]}>
          <Search
            value={postSearch.value}
            onChange={postSearch.setValue}
            onSubmit={postSearch.submit}
            placeholder="Search posts..."
          />
          <Search
            value={categorySearch.value}
            onChange={categorySearch.setValue}
            onSubmit={categorySearch.submit}
            placeholder="Search categories..."
          />
          <Select
            placeholder="Sort By"
            options={[
              { label: "Date", value: "date" },
              { label: "Date2", value: "date2" },
            ]}
          />
        </div>
        {categories && <CategoryList categories={categories} />}
      </div>
      {posts && <PostList posts={posts} />}
    </div>
  );
}
