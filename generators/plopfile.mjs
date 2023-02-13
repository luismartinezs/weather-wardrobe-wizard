export default function plopGenerator(plop) {
  plop.setGenerator("component", {
    description: "Standalone component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      }
    ],
  });
}
