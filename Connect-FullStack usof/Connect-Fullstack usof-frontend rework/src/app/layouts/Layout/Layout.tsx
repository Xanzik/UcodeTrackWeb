import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";

export function Layout() {
  return (
    <main className={styles["layout"]}>
      <div className={styles["background"]} />
      <Header className={styles["header"]} />
      <Sidebar className={styles["sidebar"]} />
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </main>
  );
}
