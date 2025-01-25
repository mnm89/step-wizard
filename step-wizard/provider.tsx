import React, { ComponentType, useCallback, useContext, useMemo } from "react";

interface Props {
  steps: {
    name: string;
    key: string;
    component: ComponentType;
  }[];
  onFinish: () => void;
  transitions?: {
    enterRight?: string;
    enterLeft?: string;
    exitRight?: string;
    exitLeft?: string;
    intro?: string;
  };
}
interface State {
  activeStep: number;
  classes: string[];
  hashKeys: Record<string, number>;
  namedSteps: Record<string, number>;
}
interface IStepWizardContext extends Props, State {
  goToNamedStep: (step: string) => void;
  firstStep: () => void;
  lastStep: () => void;
  nextStep: () => void;
  previousStep: () => void;
}
const StepWizardContext = React.createContext<IStepWizardContext | undefined>(
  undefined
);

export function StepWizardProvider(
  props: Props & { children: React.ReactNode }
) {
  const [state, setState] = React.useState<State>({
    activeStep: 0,
    classes: [props.transitions?.intro || "animate__animated animate__bounce"],
    hashKeys: props.steps.reduce((pre, cur, i) => {
      pre[cur.key || `step${i + 1}`] = i;
      return pre;
    }, {} as Record<string, number>),
    namedSteps: props.steps.reduce((pre, cur, i) => {
      pre[cur.name || `step${i + 1}`] = i;
      return pre;
    }, {} as Record<string, number>),
  });

  const setActiveStep = useCallback(
    (next: number) => {
      if (state.activeStep === next) return;
      if (next < 0 || next >= props.steps.length) {
        if (process.env.NODE_ENV !== "production") {
          console.debug(`${next + 1} is an invalid step`);
        }
        if (next > 0) {
          props.onFinish();
        }
        return;
      }
      const { classes } = state;
      if (state.activeStep < next) {
        // slide left
        classes[state.activeStep] =
          props.transitions?.exitLeft ||
          "animate__animated animate__backOutLeft";
        classes[next] =
          props.transitions?.enterRight ||
          "animate__animated animate__backInRight";
      } else {
        // slide right
        classes[state.activeStep] =
          props.transitions?.exitRight ||
          "animate__animated animate__backOutRight";
        classes[next] =
          props.transitions?.enterLeft ||
          "animate__animated animate__backInLeft";
      }

      setState((prev) => ({
        ...prev,
        activeStep: next,
        classes,
      }));
    },
    [props, state]
  );

  const goToStep = useCallback(
    (step: string | number) => {
      if (typeof step === "string") {
        if (state.hashKeys[step] !== undefined)
          setActiveStep(state.hashKeys[step]);
        else if (state.namedSteps[step] !== undefined)
          setActiveStep(state.namedSteps[step]);
        else console.error(`Cannot find step with name / key "${step}"`);
      }
      if (typeof step === "number") {
        setActiveStep(step);
      }
    },
    [setActiveStep, state.hashKeys, state.namedSteps]
  );

  const context = useMemo<IStepWizardContext>(() => {
    return {
      onFinish: props.onFinish,
      steps: props.steps,
      ...state,
      goToNamedStep: (step) => goToStep(step),
      firstStep: () => goToStep(1),
      nextStep: () => setActiveStep(state.activeStep + 1),
      lastStep: () => goToStep(props.steps.length),
      previousStep: () => setActiveStep(state.activeStep - 1),
    };
  }, [props.onFinish, props.steps, state, goToStep, setActiveStep]);

  return (
    <StepWizardContext.Provider value={context}>
      {props.children}
    </StepWizardContext.Provider>
  );
}

export function useStepWizard() {
  const context = useContext(StepWizardContext);
  if (!context) {
    throw new Error("useStepWizard must be used within an StepWizardProvider");
  }
  return context;
}
