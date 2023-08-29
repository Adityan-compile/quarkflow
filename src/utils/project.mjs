import * as fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import gradient from "gradient-string";
import inquirer from "inquirer";
import path from "path";
import prompts from "./prompts.mjs";
import { render } from "./template.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import lme from 'lme';

export const createProject = (template, name, sleep=1000,dir) => {
  lme.s(`Creating ${template} Project...`);
  const templateFile = fs.readFileSync(
    path.join(__dirname, `../templates/${template.toLowerCase()}.json`),
    "utf8"
  );
  const processedTemplate = render(templateFile, {
    name,
    sleep
  });

  if (
    fs.existsSync(path.resolve(`${dir}/.quarkflow/`)) &&
    fs.existsSync(path.resolve(`${dir}/.quarkflow/config.json`))
  ) {
    inquirer.prompt(prompts.OVERWRITE_CONFIRMATION_PROMPT).then((answer) => {
      if (answer.overwrite === true)
        return initProjectFile(processedTemplate, dir, true);

      lme.h(chalk.bold.whiteBright("\nBye... \n"));
      process.exit(0);
    });
  } else {
    initProjectFile(processedTemplate, dir);
  }
};

const initProjectFile = (processedTemplate, dir, overwrite) => {
  if (!overwrite) fs.mkdirSync(path.resolve(`${dir}/.quarkflow/`));
  fs.writeFileSync(
    path.resolve(`${dir}/.quarkflow/config.json`),
    processedTemplate
  );
  lme.s(chalk.green("Project Initialized!!"));
  lme.d(gradient.retro("Happy Coding"));
};
