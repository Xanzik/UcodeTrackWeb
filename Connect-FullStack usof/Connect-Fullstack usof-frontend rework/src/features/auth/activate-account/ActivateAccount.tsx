import { useEffect } from "react";
import cn from "classnames"; // поправь импорт под себя
import styles from "./ActivateAccount.module.css";
import { useActivateAccountMutation } from "@/entities/auth";
import { Badge } from "@/shared/ui/Badge";
import { Heading } from "@/shared/ui/Heading";
import { Status } from "@/shared/ui/Status";
import { Button } from "@/shared/ui/Button";
import { Label } from "@/shared/ui/Label";
import { Divider } from "@/shared/ui/Divider/Divider.tsx";
import { useNavigate } from "react-router-dom";

export function ActivateAccount({ token }: { token: string }) {
  const [activateAccount, { isLoading, isSuccess, error }] =
    useActivateAccountMutation();
  const navigate = useNavigate();

  const getStatusText = () => {
    if (isLoading) return "PROCESSING";
    if (isSuccess) return "VERIFIED";
    if (isError) return "DENIED";
    return "READY";
  };

  useEffect(() => {
    if (!token) return;
    void activateAccount({ token });
  }, [activateAccount, token]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  const isError = Boolean(error);

  return (
    <section className={styles.root}>
      <Badge>TECHVERSE QA</Badge>
      <Heading>ACTIVATE</Heading>
      <p className={cn(styles["subtitle"])}>ACCOUNT VERIFICATION</p>

      <div className={cn(styles["panel"])}>
        <div className={cn(styles["row"])}>
          <Label>STATUS</Label>
          <span
            className={cn(
              styles["chip"],
              isLoading && styles["chipInfo"],
              isSuccess && styles["chipOk"],
              isError && styles["chipErr"],
            )}
          >
            <Divider />
            <Status
              text={getStatusText()}
              status={isSuccess ? "online" : "offline"}
            />
          </span>
        </div>

        <Divider />

        <p className={styles["message"]}>
          {isLoading && "Verifying token…"}
          {isSuccess && "Account activated successfully. You can login now."}
          {isError && "Activation failed. Token is invalid or expired."}
          {!isLoading && !isSuccess && !isError && "Waiting for activation…"}
        </p>
      </div>
      {isSuccess && <Button>LOGIN</Button>}
      <Divider />
      <Status text="SYSTEM ONLINE" status="online" />
    </section>
  );
}
