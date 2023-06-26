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
  plop.setGenerator("feature", {
    description: 'Create a new feature',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your feature name?'
    }],
    actions: [
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/components/index.tsx',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/hooks/index.tsx',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/util/index.ts',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/types/index.ts',
        templateFile: 'templates/index.hbs',
      },
    ]
  })
}
