import styles from "./HomePage.module.css";
import { PostList } from "@/features/posts/PostList";
import { Heading } from "@/shared/ui/Heading";
import { Subtitle } from "@/shared/ui/Subtitle";
import { Search } from "@/features/search/Search";
import { useGetAllPostsQuery } from "@/entities/post/api/postApi.ts";
import { useSearchBar } from "@/features/search/model/useSearchBar.ts";

export function HomePage() {
  const { data: posts } = useGetAllPostsQuery();
  const { value, setValue, submit } = useSearchBar("post");
  return (
    <div className={styles["page"]}>
      <div className={styles["page__header"]}>
        <div>
          <Heading>QUESTIONS</Heading>
          <Subtitle>USER POSTS & INQUIRIES</Subtitle>
        </div>
        <Search
          value={value}
          onChange={setValue}
          onSubmit={submit}
          placeholder="Search posts..."
        />
        <Subtitle>Found {posts?.length} posts</Subtitle>
      </div>
      {posts && <PostList posts={posts} />}
    </div>
  );
}
