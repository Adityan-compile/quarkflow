
const prompts = {
    INIT_PROMPTS: [
        {
          type: "input",
          name: "name",
          message: "What is the Name of your Project?",
        },
        {
          type: "number",
          name: "sleep",
          message: "How much time between commands (milliseconds)?",
          default: "1000"
        },
        {
          type: "list",
          name: "template",
          message: "Choose a template(Note: Only Initializes a Quarkflow Project)",
          choices: ["Empty", "React", "Angular", "Vue", "Express", "HTML"],
        },
        {
          type: "checkbox",
          name: "integrations",
          message: "Choose Integrations",
          choices: ["Github", "Firebase", "Digital Ocean", "AWS"],
        },
        {
          type: "checkbox",
          name: "scripts",
          message: "Choose Git Automations",
          choices: ["commit", "push", "deploy"],
        },
        
      ],
      OVERWRITE_CONFIRMATION_PROMPT: [
        {
          type: "confirm",
          name: "overwrite",
          message: "A Project is already initialized in this folder. Would You Like to Overwrite?",
        },
      ]
};

export default prompts;