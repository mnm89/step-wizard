"use client";

import React, { useCallback, useEffect } from "react";
import { useStepWizard } from "./provider";
import { WizardProps } from "../types";

export default function Wizard(props: WizardProps) {
  const { activeStep, classes, goToNamedStep, hashKeys } = useStepWizard();

  const childrenWithProps = React.Children.map(
    React.Children.toArray(props.children),
    (child, i) => {
      if (!child) return null;

      // Not Lazy Mount || isLazyMount && isActive
      if (!props.isLazyMount || (props.isLazyMount && i === activeStep)) {
        return (
          <div
            className={`pointer-events-none w-full z-0 ${classes[i]} ${
              i === activeStep ? "pointer-events-auto z-10 block" : "hidden"
            }`.trim()}
          >
            {child}
          </div>
        );
      }

      return null;
    }
  );

  const onHashChange = useCallback(() => {
    goToNamedStep(decodeURI(window.location.hash).replace(/^#/, ""));
  }, [goToNamedStep]);
  const updateHash = useCallback(
    (step: number) => {
      const keyIndex = Object.values(hashKeys).indexOf(step);
      const key = Object.keys(hashKeys)[keyIndex];
      if (decodeURI(window.location.hash).replace(/^#/, "") !== key)
        window.location.hash = key;
    },
    [hashKeys]
  );
  useEffect(() => {
    const hash = decodeURI(window.location.hash).replace(/^#/, "");
    if (hash && props.isHashEnabled) goToNamedStep(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (props.isHashEnabled) {
      window.addEventListener("hashchange", onHashChange);
    }
    return () => {
      if (props.isHashEnabled) {
        window.removeEventListener("hashchange", onHashChange);
      }
    };
  }, [onHashChange, props.isHashEnabled]);

  useEffect(() => {
    if (props.isHashEnabled) updateHash(activeStep);
    if (props.onStepChange) props.onStepChange(activeStep);
  }, [activeStep, props, updateHash]);

  return <div className={props.className}>{childrenWithProps}</div>;
}
