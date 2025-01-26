"use client";
import StepsWizard from "@/step-wizard";

const step = [
  {
    name: "1st Step Name",
    key: "step-1",
    component: () => <h2>Step 1 Content</h2>,
  },
  {
    name: "2nd Step Name",
    key: "step-2",
    component: () => <h2>Step 2 Content</h2>,
  },
  {
    name: "3rd Step Name",
    key: "step-3",
    component: () => <h2>Step 3 Content</h2>,
  },
  {
    name: "4th Step Name",
    key: "step-4",
    component: () => <h2>Step 4 Content</h2>,
  },
];
export default function Page() {
  return (
    <main>
      <section className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-semibold my-5">
          Without Navigation Header
        </h2>
        <StepsWizard steps={step} noStepperHeader />
      </section>
      <section className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-semibold my-5">
          Without Navigation Buttons
        </h2>
        <StepsWizard steps={step} noNavigationButtons />
      </section>
    </main>
  );
}
