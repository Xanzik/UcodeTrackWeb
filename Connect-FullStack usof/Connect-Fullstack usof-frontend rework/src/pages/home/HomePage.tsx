import { Header } from "@/features/header/Header.tsx";
import { useAppSelector } from "@/app/hooks";
import { Sidebar } from "@/features/sidebar/Sidebar.tsx";
import cn from "classnames";
import styles from "./HomePage.module.css";
import { PostsPage } from "@/features/post/Post.tsx";

export default function HomePage() {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className={cn(styles["home"])}>
      <Header className={cn(styles["header"])} user={user} />
      <Sidebar className={cn(styles["sidebar"])} user={user} />
      <main className={cn(styles["main"])}>
        <PostsPage />
      </main>
    </div>
  );
}
