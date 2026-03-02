import styles from "./Profile.module.css";
import { useAppSelector } from "@/app/hooks";
import { Heading } from "@/shared/ui/Heading";
import { Subtitle } from "@/shared/ui/Subtitle";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Badge } from "@/shared/ui/Badge";
import { AuthPrompt } from "@/shared/ui/AuthPrompt";

export function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className={styles["page"]}>
        <div className={styles["page__header"]}>
          <Heading>PROFILE</Heading>
          <Subtitle>ACCOUNT OVERVIEW</Subtitle>
        </div>

        <div className={styles["state"]}>
          <Subtitle variant="light">
            You need to sign in to view profile details.
          </Subtitle>
          <AuthPrompt text="Go to login page" to="/login" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles["page"]}>
      <div className={styles["page__header"]}>
        <Heading>PROFILE</Heading>
        <Subtitle>ACCOUNT OVERVIEW</Subtitle>
      </div>

      <section className={styles["profile__card"]}>
        <div className={styles["profile__top"]}>
          <div className={styles["profile__identity"]}>
            <UserAvatar src={user.profilePicture} fallback={user.login} />
            <div className={styles["profile__title"]}>
              <h2 className={styles["profile__login"]}>{user.login}</h2>
              {user.fullName && (
                <Subtitle variant="light">{user.fullName}</Subtitle>
              )}
            </div>
          </div>
        </div>

        <div className={styles["profile__badges"]}>
          <Badge>{user.role.toUpperCase()}</Badge>
          <Badge>RATING {user.rating}</Badge>
        </div>

        <div className={styles["profile__details"]}>
          <div className={styles["profile__row"]}>
            <span className={styles["profile__label"]}>EMAIL</span>
            <span className={styles["profile__value"]}>{user.email}</span>
          </div>
          <div className={styles["profile__row"]}>
            <span className={styles["profile__label"]}>USER ID</span>
            <span className={styles["profile__value"]}>{user.id}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
