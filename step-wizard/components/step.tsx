import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { objectToString } from "../utils";

export interface StepProps extends React.ComponentProps<"div"> {
  className?: string;
  activeClassName?: string;
  completedClassName?: string;
  children?: ReactNode;
}
export const styles = {
  base: {
    initial: {
      position: "relative",
      zIndex: "z-10",
      display: "grid",
      placeItems: "place-items-center",
      width: "w-10",
      height: "h-10",
      borderRadius: "rounded-full",
      backgroundColor: "bg-muted",
      color: "text-muted-foreground",
      fontWeight: "font-bold",
      transition: "transition-all duration-300",
    },
    active: {
      backgroundColor: "bg-primary",
      color: "text-primary-foreground",
      border: "border-primary-foreground border-2",
      shadow: "shadow-md",
      scale: "scale-110 sm:scale-150",
      zIndex: "z-10",
    },
    completed: {
      backgroundColor: "bg-primary",
      color: "text-primary-foreground",
    },
  },
};

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cn(objectToString(styles.base.initial), className)}
      >
        {children}
      </div>
    );
  }
);

Step.displayName = "Step";

export default Step;
