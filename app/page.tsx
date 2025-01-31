"use client";
import StepsWizard from "@/step-wizard";
import { Code, Eye, Info, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CopyCodeBlock, CopyCommandLine } from "@/components/ui/code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const exampleCode = `
import StepsWizard from "@/step-wizard";
...
const steps = [
  {
    name: "Welcome",
    key: "welcome",
    component: () => (
      <div>
        <h2>Welcome to Our Platform</h2>
        <p>
          We&apos;re excited to have you onboard!
          Click &quot;Next&quot;to get started.
        </p>
      </div>
    ),
  },
  {
    name: "Personal Information",
    key: "personal-info",
    component: () => <h2>Tell Us About Yourself</h2>,
  },
  {
    name: "Preferences",
    key: "preferences",
    component: () => <h2>Set Your Preferences</h2>,
  },
  {
    name: "Review & Submit",
    key: "review-submit",
    component: () => (
      <div>
        <h2>Review Your Information</h2>
        <p>
          Please double-check the information 
          you provided before submitting.
        </p>
      </div>
    ),
  },
];
...
const onFinish = () => {
  alert("Thank you for completing the setup!");
};
...
<StepsWizard steps={steps} onFinish={onFinish}/>
`;
export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center h-screen">
      <h1 className="font-bold text-2xl">Step Wizard</h1>
      <Alert className="max-w-screen-sm w-full">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-bold text-xl">Overview</AlertTitle>
        <AlertDescription>
          The <b>StepWizard</b> component is a flexible and customizable stepper
          component designed to guide users through a multi-step process, such
          as onboarding, surveys, or forms. It simplifies the implementation of
          complex workflows by managing steps and transitions seamlessly.
        </AlertDescription>
      </Alert>
      <Alert className="max-w-screen-sm w-full">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="font-bold text-xl">Installation</AlertTitle>
        <AlertDescription>
          <CopyCommandLine code="npx shadcn@latest add https://raw.githubusercontent.com/mnm89/step-wizard/refs/heads/main/setup.json" />
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="preview" className="max-w-screen-sm w-full">
        <TabsList>
          <TabsTrigger value="preview" className="flex gap-4">
            Preview <Eye />
          </TabsTrigger>
          <TabsTrigger value="code" className="flex gap-4">
            Code <Code />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-2">
          <StepsWizard
            steps={[
              {
                name: "Welcome",
                key: "welcome",
                component: () => (
                  <div>
                    <h2>Welcome to Our Platform</h2>
                    <p>
                      We&apos;re excited to have you onboard! Click
                      &quot;Next&quot; to get started.
                    </p>
                  </div>
                ),
              },
              {
                name: "Personal Information",
                key: "personal-info",
                component: () => <h2>Tell Us About Yourself</h2>,
              },
              {
                name: "Preferences",
                key: "preferences",
                component: () => <h2>Set Your Preferences</h2>,
              },
              {
                name: "Review & Submit",
                key: "review-submit",
                component: () => (
                  <div>
                    <h2>Review Your Information</h2>
                    <p>
                      Please double-check the information you provided before
                      submitting.
                    </p>
                  </div>
                ),
              },
            ]}
            onFinish={() => {
              alert("Thank you for completing the setup!");
            }}
          />
        </TabsContent>
        <TabsContent value="code" className="p-2">
          <CopyCodeBlock code={exampleCode} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
