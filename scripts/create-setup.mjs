import fs from "node:fs";
import path from "node:path";

const SHADCN_COMPONENTS = ["card", "button"];

const EXTERNAL_DEPENDENCIES = [];
const main = () => {
  const name = "step-wizard";
  const stepWizardDir = path.join(process.cwd(), "step-wizard");
  const files = fs
    .readdirSync(stepWizardDir, {
      recursive: true,
      withFileTypes: true,
    })
    .filter((file) => file.isFile())
    .map((file) => {
      console.log(file.name);
      return {
        path: `./step-wizard${file.parentPath.replace(stepWizardDir, "")}/${
          file.name
        }`,
        content: fs.readFileSync(
          path.join(file.parentPath, file.name),
          "utf-8"
        ),
        type: "registry:block",
        target: `~/step-wizard${file.parentPath.replace(stepWizardDir, "")}/${
          file.name
        }`,
      };
    });
  const output = {
    name,
    type: "registry:block",
    registryDependencies: SHADCN_COMPONENTS,
    files,
    dependencies: EXTERNAL_DEPENDENCIES,
  };

  fs.writeFileSync(
    path.join(process.cwd(), "setup.json"),
    JSON.stringify(output, null, 2)
  );
};

main();
