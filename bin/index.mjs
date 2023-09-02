#! /usr/bin/env node

import { init, initForce} from "../src/cli.mjs";
import { checkProjectExists, createProject, readAndParseProject } from "../src/utils/project.mjs";
import { Command } from "commander";
import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import updateNotifier from "update-notifier";
import packageJson from "../package.json" assert { type: "json" };
import {
  runScriptUninteractively,
  runWorkflowUninteractively,
} from "../src/modules/workflows/index.mjs";
import { runMenu } from "../src/modules/menu.mjs";
import inquirer from "inquirer";
import lme from "lme";
import { 
  set
} from "../src/modules/state/index.mjs";
const program = new Command();

process.stdout.write(
  chalk.blue(
    boxen(gradient.passion(figlet.textSync("Quarkflow", "Doom")), {
      padding: 1,
      borderStyle: "round",
    })
  ) + "\n"
);

updateNotifier({ pkg: packageJson }).notify();

program
  .name("Quarkflow")
  .description("A Developer Friendly Workflow Management tool")
  .option("-w, --workflow <workflow>", "Run a Workflow Non Interactively")
  .option("-s, --script <script>", "Run a Script Non Interactively")
  .version("0.0.1")
  .action((options) => {
    if(checkProjectExists()){
      const project = readAndParseProject();
      set("project", project);
    }else{
      lme.e("A Project Doesn't Exist in this Folder");
      inquirer.prompt(prompts.PROJECT_CREATION_CONFIRMATION_PROMPT, {
        clearPromptOnDone: true
      }).then(answer=>{
        console.clear();
        if(answer.confirmation === true) return createProject("Empty", "quarkflow_project", 1000, ".");
        lme.d("Bye...");
      })
    }
    if (options.workflow) return runWorkflowUninteractively(options.workflow);
    if (options.script) return runScriptUninteractively(options.script);
    
    runMenu();

  });

program
  .command("init")
  .description("Initializes a quarkflow Project")
  .argument("<dir>", "Directory to initialize project")
  .option("-f,--force", "Force Create an Empty Project")
  .action((dir, options) => {
    if (options.force) return initForce(dir);
    init(dir);
  });

  program
  .command("git")
  .description("Run Supported Git Commands")
  .argument("<command>", "Git Command to Run")
  .action((dir, options) => {
    if (options.force) return initForce(dir);
    init(dir);
  });


program.parse(process.argv);
