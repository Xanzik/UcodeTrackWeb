import styles from "./Post.module.css";
import type { PostProps } from "./Post.props";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Subtitle } from "@/shared/ui/Subtitle";

export function Post({ post }: PostProps) {
  return (
    <div className={styles["post"]}>
      <div className={styles["post__left"]}>
        <UserAvatar
          src={post.author.profilePicture}
          fallback={post.author.login}
        />
      </div>
      <div className={styles["post__center"]}>
        <h2 className={styles["post__title"]}>{post.title}</h2>
        <Subtitle className={styles.postContent}>{post.content}</Subtitle>
        <Subtitle>
          BY {post.author.login} {post.author.rating}{" "}
          {post.categories.map((category) => category.title)}
          {post.createdAt}
        </Subtitle>
        <Subtitle>
          {`${post.commentsCount} comments • ${post.likesCount} likes • ${post.dislikesCount} dislikes`}
        </Subtitle>
      </div>
      <div className={styles["post__right"]}>
        <div className={styles.status}>{post.status}</div>
      </div>
    </div>
  );
}
