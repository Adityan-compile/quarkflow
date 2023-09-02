import inquirer from "inquirer";
import chalk from "chalk";
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
      default: "1000",
    },
    {
      type: "list",
      name: "template",
      message: "Choose a template(Note: Only Initializes a Quarkflow Project)",
      choices: ["Empty", "React", "Angular", "Vue", "Express", "HTML"],
    },
  ],
  OVERWRITE_CONFIRMATION_PROMPT: [
    {
      type: "confirm",
      name: "overwrite",
      message:
        "A Project is already initialized in this folder. Would You Like to Overwrite?",
    },
  ],
  PROJECT_CREATION_CONFIRMATION_PROMPT: [
    {
      type: "confirm",
      name: "confirm",
      message: "Would You Like to Create a Project in this folder?",
    },
  ],
  MENU_PROMPTS: {
    MAIN_MENU: [
      {
        type: "list",
        name: "actions",
        message: "What Do You Want to Do?",
        choices: [
          {
            name: "Run Workflows",
            value: "workflows",
            description: "Run Your Own Workflows",
          },
          {
            name: "Run Scripts",
            value: "scripts",
            description: "Run Your Scripts",
          },
          new inquirer.Separator(),
          {
            name: "Git Actions",
            value: "git",
            description: "Run Git Actions",
          },
          {
            name: "Quit",
            value: "quit",
            description: "Quit Quarkflow",
          },
        ],
      },
    ],
    WORKFLOW_MANAGER_MENU: {
      createMenu: (workflows) => {
        return {
          type: "list",
          name: "workflow",
          message: "Which Workflow Would You Like to Run?",
          choices: workflows,
        };
      },
    },
    SCRIPT_MANAGER_MENU: {
      createMenu: (scripts) => {
        return {
          type: "list",
          name: "script",
          message: "Which Script Would You Like to Run?",
          choices: scripts,
        };
      },
    },
    GIT_MANAGER_MENU: {
      createMenu: (commands) => {
        return {
          type: "list",
          name: "command",
          message: "Which Command Would You Like to Run?",
          choices: commands
        };
      },
    },
  },
};

export default prompts;
