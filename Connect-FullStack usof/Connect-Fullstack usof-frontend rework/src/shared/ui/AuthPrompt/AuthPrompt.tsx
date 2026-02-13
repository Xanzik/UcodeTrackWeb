import cn from "classnames";
import styles from "./AuthPrompt.module.css";
import { Link } from "react-router-dom";
import type { AuthPromptProps } from "@/shared/ui/AuthPrompt/AuthPrompt.props.ts";

export function AuthPrompt({ text, to }: AuthPromptProps) {
  return (
    <Link to={to} className={cn(styles["auth-prompt__link"])}>
      {text}
    </Link>
  );
}
