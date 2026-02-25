import styles from "./PostList.module.css";
import { Post } from "@/entities/post/ui/Post";
import type { PostListProps } from "@/features/posts/PostList/PostList.props.ts";

export function PostList({ posts }: PostListProps) {
  return (
    <div className={styles["post__list"]}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
