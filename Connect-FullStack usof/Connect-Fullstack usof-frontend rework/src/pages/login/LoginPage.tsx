import { LoginForm } from "@/features/auth/login/LoginForm";
import Logo from "@/shared/ui/Logo/Logo.tsx";
import styles from "./LoginPage.module.css";
import cn from "classnames";

export default function LoginPage() {
  return (
    <div className={cn(styles["login-page"])}>
      <Logo>TECHVERSE QA</Logo>
      <LoginForm />
    </div>
  );
}
