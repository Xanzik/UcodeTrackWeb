import type { LogoProps } from "@/shared/ui/Logo/Logo.props.ts";
import cn from "classnames";
import styles from "./Logo.module.css";

function Logo({ children, className }: LogoProps) {
  return <h1 className={cn(styles["logo"], className)}>{children}</h1>;
}

export default Logo;
