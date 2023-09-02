import inquirer from "inquirer";
import { checkRepositoryExists } from "./git.mjs";
import { runSingleCommand } from "../../utils/execution.mjs";
import lme from "lme";
import prompts from "../../utils/prompts.mjs";
export const launchGitManager = () => {
  if (checkRepositoryExists()) {
    let commands = ["Branch", "Diff", "Log", "Checkout", "Clean"];
    inquirer
      .prompt(prompts.MENU_PROMPTS.GIT_MANAGER_MENU.createMenu(commands))
      .then(({ command }) => {
        command = command.toLowerCase();
        lme.i(`Running Command: git ${command}`);
        runSingleCommand("git", [command]);
      });
  } else {
    lme.i("Git Repository not Found!");
    lme.i("Initializing Git Repository");
    runSingleCommand("git", ["init"]);
  }
};
