import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { styles as stepStyles } from "./step";
import { objectToString } from "./utils";

export interface StepperProps extends React.ComponentProps<"div"> {
  activeStep?: number;
  isFirstStep?: (arg: boolean) => void;
  isLastStep?: (arg: boolean) => void;
  className?: string;
  lineClassName?: string;
  activeLineClassName?: string;
  children: ReactNode;
}
const styles = {
  base: {
    stepper: {
      width: "w-full",
      position: "relative",
      display: "flex",
      alignItems: "items-center",
      justifyContent: "justify-between",
    },
    line: {
      initial: {
        position: "absolute",
        left: "left-0",
        top: "top-2/4",
        height: "h-0.5",
        width: "w-full",
        transform: "-translate-y-2/4",
        backgroundColor: "bg-muted",
      },
      active: {
        backgroundColor: "bg-primary",
        transition: "transition-all",
        duration: "duration-500",
      },
    },
  },
};

export default function Stepper({
  activeStep,
  isFirstStep,
  isLastStep,
  className,
  lineClassName,
  activeLineClassName,
  children,
  ...rest
}: StepperProps) {
  const base = styles.base;
  const stepBase = stepStyles.base;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [widthPerStep, setWidthPerStep] = React.useState(0);
  const isFirstStepValue = activeStep === 0;
  const isLastStepValue =
    Array.isArray(children) && activeStep === children.length - 1;
  const isReachEnd =
    Array.isArray(children) && (activeStep || 0) > children.length - 1;

  React.useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      const widthPerStepCalc =
        width / (Array.isArray(children) ? children.length - 1 : 0);

      setWidthPerStep(widthPerStepCalc);
    }
  }, [children]);

  const width = React.useMemo(() => {
    if (!isReachEnd) {
      return widthPerStep * (activeStep || 0);
    }
  }, [activeStep, isReachEnd, widthPerStep]);

  // 3. set styles
  const stepperClasses = cn(objectToString(base.stepper), className);
  const lineClasses = cn(objectToString(base.line.initial), lineClassName);
  const activeLineClasses = cn(
    lineClasses,
    objectToString(base.line.active),
    activeLineClassName
  );
  const activeStepClasses = objectToString(stepBase.active);
  const completedStepClasses = objectToString(stepBase.completed);

  React.useEffect(() => {
    if (isLastStep && typeof isLastStep === "function")
      isLastStep(isLastStepValue);
    if (isFirstStep && typeof isFirstStep === "function")
      isFirstStep(isFirstStepValue);
  }, [isFirstStep, isFirstStepValue, isLastStep, isLastStepValue]);

  // 4. return
  return (
    <div {...rest} ref={containerRef} className={stepperClasses}>
      <div className={lineClasses} />
      <div
        className={activeLineClasses}
        style={{
          width: `${width}px`,
        }}
      />
      {Array.isArray(children)
        ? children.map((child, index) => {
            return React.cloneElement(child, {
              key: index,
              ...child.props,
              className: cn(
                child.props.className,
                index === activeStep
                  ? cn(activeStepClasses, child.props?.activeClassName)
                  : index < (activeStep || 0)
                  ? cn(completedStepClasses, child.props?.completedClassName)
                  : ""
              ),
            });
          })
        : children}
    </div>
  );
}
