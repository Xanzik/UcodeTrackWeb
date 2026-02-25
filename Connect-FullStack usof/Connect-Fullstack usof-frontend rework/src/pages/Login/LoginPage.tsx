import { LoginForm } from "@/features/auth/login/LoginForm";
import styles from "./LoginPage.module.css";
import cn from "classnames";

export function LoginPage() {
  return (
    <div className={cn(styles["page"])}>
      <LoginForm />
    </div>
  );
}
