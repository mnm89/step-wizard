export interface NavigationProps {
  disabled?: boolean;
}

export interface StepperProps {
  disabled?: boolean;
}

export interface WizardProps {
  initialStep?: number;
  isHashEnabled?: boolean;
  isLazyMount?: boolean;
  onStepChange?: (currentStep: number) => void;
  className?: string;
  children: JSX.Element | JSX.Element[] | React.ReactElement;
}
