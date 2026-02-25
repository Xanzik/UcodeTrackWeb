import { Outlet } from "react-router-dom";
import cn from "classnames";
import styles from "./AuthLayout.module.css";

export function AuthLayout() {
  return (
    <main className={cn(styles["layout"])}>
      <div className={cn(styles["background"])} />
      <div className={cn(styles["content"])}>
        <Outlet />
      </div>
    </main>
  );
}
