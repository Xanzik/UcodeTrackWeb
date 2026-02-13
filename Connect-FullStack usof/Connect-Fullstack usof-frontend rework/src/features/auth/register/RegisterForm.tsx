import type { SubmitEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import styles from "./RegisterForm.module.css";
import cn from "classnames";
import { Badge } from "@/shared/ui/Badge";
import { Heading } from "@/shared/ui/Heading";
import { AuthPrompt } from "@/shared/ui/AuthPrompt";
import { Status } from "@/shared/ui/Status";

export function RegisterForm() {
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={cn(styles["form"])} onSubmit={onSubmit}>
      <Badge>TECHVERSE QA</Badge>
      <Heading>REGISTER</Heading>
      <p className={cn(styles["subtitle"])}>REGISTRATION IN THE SYSTEM</p>
      <Input
        type="email"
        id="email"
        name="email"
        autoComplete="on"
        placeholder="EMAIL ADDRESS"
      />
      <Input type="text" name="login" id="login" placeholder="LOGIN" />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="PASSWORD"
      />
      <Input
        type="password"
        name="passwordConfirmation"
        id="passwordConfirmation"
        placeholder="PASSWORD CONFIRMATION"
      />
      <Button>REGISTER</Button>
      <div className={cn(styles["prompt_container"])}>
        <AuthPrompt text={"FORGOT PASSWORD?"} to={"/login"} />
        <AuthPrompt text={"HAVE AN ACCOUNT?"} to={"/login"} />
      </div>
      <Status text="SYSTEM ONLINE" status="online" />
    </form>
  );
}
