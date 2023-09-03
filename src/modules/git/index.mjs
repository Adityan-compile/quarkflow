import inquirer from "inquirer";
import { checkRepositoryExists } from "./git.mjs";
import { runSingleCommand } from "../../utils/execution.mjs";

import signale from "signale";
import prompts from "../../utils/prompts.mjs";
export const launchGitManager = () => {
  if (checkRepositoryExists()) {
    let commands = ["Branch", "Diff", "Log", "Checkout", "Clean"];
    inquirer
      .prompt(prompts.MENU_PROMPTS.GIT_MANAGER_MENU.createMenu(commands))
      .then(({ command }) => {
        command = command.toLowerCase();
        signale.await(`Running Command: git ${command}`);
        runSingleCommand("git", [command]);
      });
  } else {
    signale.warn("Git Repository not Found!");
    signale.info("Initializing Git Repository");
    runSingleCommand("git", ["init"]);
  }
};
