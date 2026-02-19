import { type SubmitEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import styles from "./LoginForm.module.css";
import cn from "classnames";
import { Badge } from "@/shared/ui/Badge";
import { Heading } from "@/shared/ui/Heading";
import { AuthPrompt } from "@/shared/ui/AuthPrompt";
import { Status } from "@/shared/ui/Status";
import { useLoginMutation } from "@/entities/auth";

export function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    await login({ email, password });
  };

  return (
    <form className={cn(styles["form"])} onSubmit={onSubmit}>
      <Badge>TECHVERSE QA</Badge>
      <Heading>LOGIN</Heading>
      <p className={cn(styles["subtitle"])}>AUTHORIZATION IN THE SYSTEM</p>
      {isLoading && <div>Login</div>}
      <Input
        type="email"
        id="email"
        name="email"
        autoComplete="on"
        placeholder="EMAIL ADDRESS"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="PASSWORD"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div>Error</div>}
      <Button>LOGIN</Button>
      <div className={cn(styles["prompt_container"])}>
        <AuthPrompt text={"FORGOT PASSWORD?"} to={"/register"} />
        <AuthPrompt text={"CREATE ACCOUNT?"} to={"/register"} />
      </div>
      <Status text="SYSTEM ONLINE" status="online" />
    </form>
  );
}
