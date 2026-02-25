import styles from "./UserAvatar.module.css";
import type { UserAvatarProps } from "./UserAvatar.props";

export function UserAvatar({ src, fallback }: UserAvatarProps) {
  return (
    <div className={styles["user__avatar"]}>
      {src ? (
        <img className={styles["user__avatar-img"]} src={src} alt="Avatar" />
      ) : (
        <div className={styles["user__avatar-fallback"]} aria-hidden="true">
          {fallback.slice(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  );
}
