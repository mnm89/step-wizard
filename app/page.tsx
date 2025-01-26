"use client";
import StepsWizard from "@/step-wizard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <StepsWizard
        enableHashUrl
        steps={[
          {
            name: "Welcome",
            key: "welcome",
            component: () => (
              <div>
                <h2>Welcome to Our Platform</h2>
                <p>
                  We&apos;re excited to have you onboard! Click &quot;Next&quot;
                  to get started.
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
    </main>
  );
}
