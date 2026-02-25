import { type SubmitEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import styles from "./RegisterForm.module.css";
import cn from "classnames";
import { Badge } from "@/shared/ui/Badge";
import { Heading } from "@/shared/ui/Heading";
import { AuthPrompt } from "@/shared/ui/AuthPrompt";
import { Status } from "@/shared/ui/Status";
import { useRegisterMutation } from "@/entities/auth";
import { Divider } from "@/shared/ui/Divider/Divider.tsx";
import { Subtitle } from "@/shared/ui/Subtitle";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [register, { isSuccess, isLoading, error }] = useRegisterMutation();
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ email, login, password, passwordConfirmation });
  };
  return (
    <form className={cn(styles["form"])} onSubmit={onSubmit}>
      <Badge>TECHVERSE QA</Badge>
      <Heading>REGISTER</Heading>
      <Subtitle>REGISTRATION IN THE SYSTEM</Subtitle>
      {isLoading && <div>Loading</div>}
      <Input
        type="email"
        id="email"
        name="email"
        autoComplete="on"
        placeholder="EMAIL ADDRESS"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        name="login"
        id="login"
        placeholder="LOGIN"
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="PASSWORD"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        name="passwordConfirmation"
        id="passwordConfirmation"
        placeholder="PASSWORD CONFIRMATION"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
      <Button>REGISTER</Button>
      <Divider />
      <div className={cn(styles["prompt_container"])}>
        <AuthPrompt text={"FORGOT PASSWORD?"} to={"/Login"} />
        <AuthPrompt text={"HAVE AN ACCOUNT?"} to={"/Login"} />
      </div>
      {isSuccess && <div>Success, please activate your mail</div>}
      <Status text="SYSTEM ONLINE" status="online" />
    </form>
  );
}
