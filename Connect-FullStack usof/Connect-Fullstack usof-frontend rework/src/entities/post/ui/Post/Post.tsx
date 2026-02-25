import styles from "./Post.module.css";
import { UserBadge } from "@/entities/user/ui/UserBadge";
import type { PostProps } from "./Post.props";

export function Post({ post }: PostProps) {
  return (
    <div key={post.id} className={styles.post}>
      <div className={styles.postHeader}>
        <UserBadge user={post.author}></UserBadge>
      </div>

      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postContent}>{post.content}</p>

      <div className={styles.postFooter}>
        <div className={styles.status}>{post.status}</div>
      </div>
    </div>
  );
}
