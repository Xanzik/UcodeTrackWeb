import styles from "./RegisterPage.module.css";
import cn from "classnames";
import { RegisterForm } from "@/features/auth/register/RegisterForm.tsx";

export default function RegisterPage() {
  return (
    <div className={cn(styles["page"])}>
      <RegisterForm />
    </div>
  );
}
