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

function StepContent(props: {
  component: ComponentType;
  hashKey: string;
  stepName: string;
}) {
  const { component, stepName } = props;
  const ChildComponent = () => React.createElement(component);
  const { activeStep, previousStep, nextStep, steps } = useStepWizard();
  return (
    <Card key={stepName} className="my-5">
      <CardHeader>
        <CardTitle>
          {activeStep + 1} - {stepName}
        </CardTitle>
        <CardDescription className="flex justify-center gap-8 py-4">
          <Button size="sm" onClick={previousStep} disabled={activeStep === 0}>
            Prev
          </Button>
          <Button
            size="sm"
            onClick={nextStep}
            disabled={activeStep === steps.length}
          >
            Next
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChildComponent />
      </CardContent>
    </Card>
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
  onFinish: () => void;
  className?: string;
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
      <div className="flex flex-col gap-4">
        <StepperNavigation />
        <Wizard isHashEnabled={true}>
          {props.steps.map(({ key, component, name }) => (
            <StepContent
              key={key}
              hashKey={key}
              stepName={name}
              component={component}
            />
          ))}
        </Wizard>
      </div>
    </StepWizardProvider>
  );
}
