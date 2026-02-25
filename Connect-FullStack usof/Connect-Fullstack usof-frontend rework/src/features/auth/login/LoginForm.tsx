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
import { Subtitle } from "@/shared/ui/Subtitle";
import { Divider } from "@/shared/ui/Divider";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <form className={cn(styles["form"])} onSubmit={onSubmit}>
      <Badge>TECHVERSE QA</Badge>
      <Heading>LOGIN</Heading>
      <Subtitle>AUTHORIZATION IN THE SYSTEM</Subtitle>
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
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && "status" in error && (
        <div>
          {typeof error.data === "string"
            ? error.data
            : error.data &&
                typeof error.data === "object" &&
                "message" in error.data
              ? String((error.data as any).message)
              : `Ошибка ${error.status}`}
        </div>
      )}
      <Button>LOGIN</Button>
      <div className={cn(styles["prompt_container"])}>
        <AuthPrompt text={"FORGOT PASSWORD?"} to={"/Register"} />
        <AuthPrompt text={"CREATE ACCOUNT?"} to={"/Register"} />
      </div>
      <Divider />
      <Status text="SYSTEM ONLINE" status="online" />
    </form>
  );
}
