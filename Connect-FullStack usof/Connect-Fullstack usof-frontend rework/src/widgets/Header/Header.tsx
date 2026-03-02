import cn from "classnames";
import styles from "./Header.module.css";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Subtitle } from "@/shared/ui/Subtitle";
import { UserBadge } from "@/entities/user/ui/UserBadge";
import type { HeaderProps } from "./Header.props";
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/entities/auth/api/authApi.ts";

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [logout] = useLogoutMutation();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <header className={cn(styles["header"], className)}>
      <div className={styles["header__wrapper"]}>
        <div className={styles["header__left"]}>
          <Badge>TECHVERSE QA</Badge>
          <div className={styles["header__subtitles"]}>
            <Subtitle variant="light">DASHBOARD</Subtitle>
            <Subtitle>SYSTEM INTERFACE</Subtitle>
          </div>
        </div>

        <div className={styles["header__right"]}>
          {user ? (
            <>
              <UserBadge user={user} />
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin}>LOGIN</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
