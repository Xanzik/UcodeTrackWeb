import { Outlet } from "react-router-dom";
import cn from "classnames";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <main className={cn(styles["layout"])}>
      <div className={cn(styles["background"])} />
      <div className={cn(styles["content"])}>
        <Outlet />
      </div>
    </main>
  );
}
