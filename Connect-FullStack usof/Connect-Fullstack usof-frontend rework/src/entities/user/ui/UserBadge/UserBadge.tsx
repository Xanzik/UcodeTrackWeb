import styles from "./UserBadge.module.css";
import type { UserBadgeProps } from "./UserBadge.props.ts";
import { UserAvatar } from "@/shared/ui/UserAvatar";

export function UserBadge({ user }: UserBadgeProps) {
  return (
    <>
      <div className={styles["user__meta"]}>
        <span className={styles["user__login"]}>{user?.login}</span>
        <span className={styles["user__role"]}>{user?.role}</span>
      </div>
      <UserAvatar
        src={user?.profilePicture}
        fallback={user?.login ? user.login : "unknown"}
      />
    </>
  );
}
