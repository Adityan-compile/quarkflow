import * as fs from "fs";
import * as path from "path";

import chalk from "chalk";
import inquirer from "inquirer";

function init(dir) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "project name",
        message: "What is the Name of your Project?",
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template",
        choices: ["None", "React", "Angular", "Vue", "Express"],
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
        message: "Choose Integrations",
        choices: ["build", "push", "debug", "deploy"],
      },
    ])
    .then((answers) => {
      
      switch (answers.template) {
        case "React":
          console.log(chalk.blue("Creating React Project"));
          break;
        case "Angular":
          console.log(chalk.red("Creating Angular Project"));
          break;
        case "Vue":
          console.log(chalk.green("Creating Vue Project"));
          break;
        case "Express":
          console.log(chalk.white("Creating Express Project"));
          break;
        default:
          console.log(chalk.grey("Creating Empty Project"));
          break;
      }
    })
    .catch((err) => {});
}

export default { init };
