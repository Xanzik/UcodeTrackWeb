import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn(styles["sidebar__wrapper"], className)}>
      <nav className={styles["nav__list"]}>
        <Link to="/" className={styles["nav__link"]}>
          Dashboard
        </Link>
        <Link to="/settings" className={styles["nav__link"]}>
          Settings
        </Link>
        <Link to="/profile" className={styles["nav__link"]}>
          Profile
        </Link>
        <Link to="/users" className={styles["nav__link"]}>
          Users
        </Link>
      </nav>
    </aside>
  );
}
