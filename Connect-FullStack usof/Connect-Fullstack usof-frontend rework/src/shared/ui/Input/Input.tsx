import { forwardRef } from "react";
import type { InputProps } from "@/shared/ui/Input/Input.props.ts";
import cn from "classnames";
import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, startSlot, ...props }, ref) => {
    return (
      <div className={cn(styles["input"], className)}>
        {startSlot}
        <input ref={ref} className={cn(styles["input__field"])} {...props} />
      </div>
    );
  },
);
