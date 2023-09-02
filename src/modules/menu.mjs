import inquirer from "inquirer";
import prompts from "../utils/prompts.mjs";
import {
  launchScriptManager,
  launchWorkflowManager,
} from "./workflows/index.mjs";
import { launchGitManager } from "./git/index.mjs";

export const runMenu = () => {
  inquirer.prompt(prompts.MENU_PROMPTS.MAIN_MENU).then((answers) => {
    console.clear();
    switch (answers.actions) {
      case "workflows":
        launchWorkflowManager();
        break;
      case "scripts":
        launchScriptManager();
        break;
      case "git":
        launchGitManager();
        break;
      default:
        process.exit(0);
    }
  });
};
