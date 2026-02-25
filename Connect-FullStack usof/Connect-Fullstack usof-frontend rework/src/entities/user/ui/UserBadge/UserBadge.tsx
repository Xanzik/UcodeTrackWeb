import styles from "./UserBadge.module.css";
import type { UserBadgeProps } from "./UserBadge.props.ts";

export function UserBadge({ user }: UserBadgeProps) {
  return (
    <>
      <div className={styles["user__meta"]}>
        <span className={styles["user__login"]}>{user?.login}</span>
        <span className={styles["user__role"]}>{user?.role}</span>
      </div>

      <div className={styles["user__avatar"]}>
        {user?.profilePicture ? (
          <img
            className={styles["user__avatar-img"]}
            src={user.profilePicture}
            alt="Avatar"
          />
        ) : (
          <div className={styles["user__avatar-fallback"]} aria-hidden="true">
            {user?.login.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
    </>
  );
}
