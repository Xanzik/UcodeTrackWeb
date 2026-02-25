import styles from "@/pages/Login/LoginPage.module.css";
import { useParams } from "react-router-dom";
import { ActivateAccount } from "@/features/auth/activate-account/ActivateAccount.tsx";

export function ActivateAccountPage() {
  const { token } = useParams<{ token: string }>();
  if (!token) {
    return <div>Incorrect token</div>;
  }
  return (
    <div className={styles["page"]}>
      <ActivateAccount token={token} />
    </div>
  );
}
