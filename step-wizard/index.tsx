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
import Step from "./step";
import Stepper from "./stepper";
import Wizard from "./wizard";
import "./animate.css";
import { StepWizardProvider, useStepWizard } from "./provider";
import { cn } from "@/lib/utils";

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

function StepperNavigation() {
  const { steps, activeStep, goToNamedStep } = useStepWizard();
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
  noStepperHeader?: boolean;
  noNavigationButtons?: boolean;
  enableHashUrl?: boolean;
}
export default function StepWizard(props: Props) {
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
        {!props.noStepperHeader && <StepperNavigation />}
        <Wizard isHashEnabled={props.enableHashUrl}>
          {props.steps.map(({ key, component, name }) => {
            return (
              <Card key={key} className="my-5">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  {!props.noNavigationButtons && (
                    <CardDescription className="flex justify-center gap-8 py-4">
                      <PreviousButton />
                      <NextButton />
                    </CardDescription>
                  )}
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
