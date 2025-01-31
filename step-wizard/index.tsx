"use client";

import React, { ComponentType, useEffect, useState } from "react";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Step from "./components/step";
import Stepper from "./components/stepper";
import Wizard from "./components/wizard";
import "./styles/animate.css";
import { StepWizardProvider, useStepWizard } from "./components/provider";
import { cn } from "@/lib/utils";
import { NavigationProps, StepperProps, WizardProps } from "./types";

function NextButton() {
  const { activeStep, nextStep, steps, onFinish } = useStepWizard();

  if (onFinish && activeStep === steps.length - 1)
    return (
      <Button size="sm" onClick={onFinish}>
        Finish
      </Button>
    );

  return (
    <Button
      size="sm"
      onClick={nextStep}
      disabled={activeStep === steps.length - 1}
    >
      Next
    </Button>
  );
}

function PreviousButton() {
  const { activeStep, previousStep } = useStepWizard();
  return (
    <Button size="sm" onClick={previousStep} disabled={activeStep === 0}>
      Prev
    </Button>
  );
}

function ButtonsNavigation(props: NavigationProps) {
  if (props.disabled) return null;
  return (
    <CardDescription className="flex justify-center gap-8 py-4">
      <PreviousButton />
      <NextButton />
    </CardDescription>
  );
}

function StepperNavigation(props: StepperProps) {
  const { steps, activeStep, goToNamedStep } = useStepWizard();
  if (props.disabled) return null;
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((s, i) => (
        <Step
          key={s.key}
          className="cursor-pointer"
          onClick={() => goToNamedStep(s.name)}
        >
          {i + 1}
        </Step>
      ))}
    </Stepper>
  );
}
interface Props {
  steps: {
    name: string;
    key: string;
    component: ComponentType;
  }[];
  onFinish?: () => void;
  className?: string;
  stepperProps?: StepperProps;
  navigationProps?: NavigationProps;
  wizardProps?: WizardProps;
}
export function StepWizard(props: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady)
    return (
      <div className="flex min-h-[480px] items-center justify-center">
        <Loader className="m-auto animate-spin text-4xl" />
      </div>
    );

  return (
    <StepWizardProvider steps={props.steps} onFinish={props.onFinish}>
      <div className={cn("w-[640px] flex flex-col gap-4", props.className)}>
        <StepperNavigation {...props.stepperProps} />
        <Wizard {...props.wizardProps}>
          {props.steps.map(({ key, component, name }) => {
            return (
              <Card key={key} className="my-5">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <ButtonsNavigation {...props.navigationProps} />
                </CardHeader>
                <CardContent>{React.createElement(component)}</CardContent>
              </Card>
            );
          })}
        </Wizard>
      </div>
    </StepWizardProvider>
  );
}
export default StepWizard;
