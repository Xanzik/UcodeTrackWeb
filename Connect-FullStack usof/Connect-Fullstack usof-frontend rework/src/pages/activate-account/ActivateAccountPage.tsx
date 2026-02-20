import cn from "classnames";
import styles from "@/pages/login/LoginPage.module.css";
import { useParams } from "react-router-dom";
import { ActivateAccount } from "@/features/auth/activate-account/ActivateAccount.tsx";

export default function ActivateAccountPage() {
  const { token } = useParams<{ token: string }>();
  if (!token) return <div>Incorrect token</div>;
  return (
    <div className={cn(styles["page"])}>
      <ActivateAccount token={token} />
    </div>
  );
}
