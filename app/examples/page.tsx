"use client";
import LazyMountExample from "@/components/examples/lazy-mount";
import NavigationButtonsExample from "@/components/examples/navigation-buttons";
import NavigationStepperExample from "@/components/examples/navigation-stepper";

export default function Page() {
  return (
    <main>
      <NavigationStepperExample />
      <NavigationButtonsExample />
      <LazyMountExample />
    </main>
  );
}
