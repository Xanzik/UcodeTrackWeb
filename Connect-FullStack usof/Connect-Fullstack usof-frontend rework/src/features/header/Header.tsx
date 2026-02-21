import cn from "classnames";
import styles from "./Header.module.css";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Subtitle } from "@/shared/ui/Subtitle";
import type { HeaderProps } from "@/features/header/Header.props.ts";

export function Header({
  user,
  // query,
  // onQueryChange,
  // onSearch,
  className,
}: HeaderProps) {
  return (
    <header className={cn(styles["header"], className)}>
      <div className={styles["header__wrapper"]}>
        <div className={styles["header__left"]}>
          <Badge>TECHVERSE QA</Badge>
          <div className={styles["header__subtitles"]}>
            <Subtitle variant="light">DASHBOARD</Subtitle>
            <Subtitle>SYSTEM INTERFACE</Subtitle>
          </div>
        </div>

        <div className={styles["header__center"]}>
          <form
            className={styles["search__form"]}
            onSubmit={(e) => {
              e.preventDefault();
              // onSearch();
            }}
            role="search"
          >
            <Input
              // value={query}
              // onChange={(e) => onQueryChange(e.target.value)}
              startSlot={
                <span className={styles["searchIcon"]} aria-hidden="true">
                  ⌕
                </span>
              }
              placeholder="SEARCH…"
            />
            <Button type="submit">SEARCH</Button>
          </form>
        </div>

        <div className={styles["header__right"]}>
          <div className={styles.userMeta}>
            <span className={styles.nickname}>{user?.login}</span>
            <span className={styles.roleChip}>{user?.role}</span>
          </div>

          <div className={styles.avatarWrap}>
            {user?.profilePicture ? (
              <img
                className={styles.avatar}
                src={user.profilePicture}
                alt="Avatar"
              />
            ) : (
              <div className={styles.avatarFallback} aria-hidden="true">
                {user?.login.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
