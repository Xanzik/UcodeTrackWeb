import type { SubmitEvent } from "react";
import Button from "@/shared/ui/Button/Button.tsx";
import Label from "@/shared/ui/Label/Label.tsx";
import Input from "@/shared/ui/Input/Input.tsx";
import styles from "./LoginForm.module.css";
import cn from "classnames";

export function LoginForm() {
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={cn(styles["form"])} onSubmit={onSubmit}>
      <Label>Email</Label>
      <Input type="email" />
      <Label>Password</Label>
      <Input type="password" />
      <div>
        <Button>Login</Button>
        <Button>Still not registered?</Button>
      </div>
    </form>
  );
}
