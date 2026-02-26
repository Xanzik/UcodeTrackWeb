import styles from "./Post.module.css";
import type { PostProps } from "./Post.props";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Subtitle } from "@/shared/ui/Subtitle";
import CommentIcon from "@/shared/assets/comment-icon.svg?react";
import LikeIcon from "@/shared/assets/like-icon.svg?react";
import cn from "classnames";

export function Post({ post }: PostProps) {
  const formatDate = (iso: string) => {
    const date = new Date(iso);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
      .format(date)
      .toUpperCase();
  };
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
        <Subtitle className={styles["post__subtitle"]}>{post.content}</Subtitle>

        <div className={styles["post__meta"]}>
          <p
            className={cn(
              styles["post__meta-login"],
              styles[`post__meta-login-${post.author.role}`],
            )}
          >
            BY {post.author.login}
          </p>
          <p className={styles["post__meta-rating"]}>{post.author.rating}</p>
          {post.categories.map((category) => (
            <p key={category.id} className={styles["post__category"]}>
              {category.title}
            </p>
          ))}
        </div>
        <div className={styles["post__center-footer"]}>
          <div className={styles["count-container"]}>
            <p className={styles["comment-count"]}>{post.commentsCount}</p>
            <CommentIcon className={styles["comment-icon"]} />
          </div>
          <div className={styles["count-container"]}>
            <p className={styles["likes-count"]}>{post.likesCount}</p>
            <LikeIcon className={styles["like-icon"]} />
          </div>
          <div className={styles["count-container"]}>
            <p className={styles["dislikes-count"]}>{post.dislikesCount}</p>
            <LikeIcon className={styles["dislike-icon"]} />
          </div>
          <p className={styles["post__meta-date"]}>
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
      <div className={styles["post__right"]}>
        <div className={styles.status}>{post.status}</div>
      </div>
    </div>
  );
}
