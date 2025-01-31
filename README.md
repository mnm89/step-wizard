# StepWizard Component

## Overview

The `StepWizard` component is a flexible and customizable stepper component designed to guide users through a multi-step process, such as onboarding, surveys, or forms. It simplifies the implementation of complex workflows by managing steps and transitions seamlessly.

## Features

- Dynamically configurable steps.
- Customizable components for each step.
- Callback support for finishing the process.
- Easy integration into React applications.

---

## Installation

Using shadcn CLI:

```bash
npx shadcn add https://raw.githubusercontent.com/mnm89/step-wizard/refs/heads/main/setup.json
```

## Usage

Here is a basic example of how to use the `StepWizard` component in your React application:

```tsx
import React from "react";
import StepWizard from "step-wizard";

const App = () => {
  return (
    <StepWizard
      steps={[
        {
          name: "Welcome",
          key: "welcome",
          component: () => (
            <div>
              <h2>Welcome to Our Platform</h2>
              <p>We're excited to have you onboard! Click "Next" to get started.</p>
            </div>
          ),
        },
        {
          name: "Personal Information",
          key: "personal-info",
          component: () => (
            <div>
              <h2>Tell Us About Yourself</h2>
              <label>
                First Name: <input type="text" placeholder="John" />
              </label>
              <br />
              <label>
                Last Name: <input type="text" placeholder="Doe" />
              </label>
            </div>
          ),
        },
        {
          name: "Preferences",
          key: "preferences",
          component: () => (
            <div>
              <h2>Set Your Preferences</h2>
              <label>
                <input type="checkbox" /> Receive Email Notifications
              </label>
              <br />
              <label>
                <input type="checkbox" /> Enable Dark Mode
              </label>
            </div>
          ),
        },
        {
          name: "Review & Submit",
          key: "review-submit",
          component: () => (
            <div>
              <h2>Review Your Information</h2>
              <p>Please double-check the information you provided before submitting.</p>
              <button>Submit</button>
            </div>
          ),
        },
      ]}
      onFinish={() => {
        alert("Thank you for completing the setup!");
      }}
    />
  );
};

export default App;
```

---

## Props

### `steps` (required)

An array of steps to configure the wizard. Each step is an object with the following properties:

| Property   | Type     | Description                                                  |
|------------|----------|--------------------------------------------------------------|
| `name`     | `string` | The display name of the step.                                |
| `key`      | `string` | A unique identifier for the step.                           |
| `component`| `() => JSX.Element` | A React component that renders the content for this step. |

### `onFinish` (optional)

A callback function executed when the user completes all the steps.

| Property  | Type       | Description                          |
|-----------|------------|--------------------------------------|
| `onFinish`| `() => void` | A function to call when the wizard finishes. |

---

## Example Scenarios

1. **Onboarding Flow**: Use `StepWizard` to guide new users through a multi-step onboarding process.
2. **Survey**: Create an interactive survey or questionnaire with multiple steps.
3. **Multi-Step Form**: Break down complex forms into manageable steps to improve user experience.

---

## Customization

Each step can include any custom React component. You can style and configure each step to suit your specific needs. For example, you can include validation logic, animations, or conditionally rendered elements in each step's `component`.

---

## Contribution

If you'd like to contribute to the `StepWizard` component, feel free to fork the repository and open a pull request with your enhancements or bug fixes.

---

## License

`StepWizard` is licensed under the MIT License. Feel free to use it in personal or commercial projects.
