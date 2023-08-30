import * as fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import gradient from "gradient-string";
import inquirer from "inquirer";
import path from "path";
import prompts from "./prompts.mjs";
import { parseProjectFile, renderTemplate } from "./template.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import lme from "lme";

export const createProject = (template, name, sleep = 1000, dir, force) => {
  lme.s(`Creating ${template} Project...`);
  const templateFile = fs.readFileSync(
    path.join(__dirname, `../templates/${template.toLowerCase()}.json`),
    "utf-8"
  );
  const processedTemplate = renderTemplate(templateFile, {
    name,
    sleep,
  });

  if (!fs.existsSync(path.resolve(dir))) fs.mkdirSync(path.resolve(dir));

  if (
    fs.existsSync(path.resolve(`${dir}/.quarkflow/`)) &&
    fs.existsSync(path.resolve(`${dir}/.quarkflow/config.json`))
  ) {
    if (force === true) return initProjectFile(processedTemplate, dir, true);
    inquirer
      .prompt(prompts.OVERWRITE_CONFIRMATION_PROMPT, {
        clearPromptOnDone: true,
      })
      .then((answer) => {
        console.clear();
        if (answer.overwrite === true)
          return initProjectFile(processedTemplate, dir, true);

        lme.d("Bye...");
        process.exit(0);
      });
  } else {
    return initProjectFile(processedTemplate, dir, false);
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

export const checkProjectExists = () => {
  const projectPath = path.resolve("./.quarkflow/config.json");
  if (fs.existsSync(projectPath)) {
    return true;
  } else {
    return false;
  }
};

export const readAndParseProject = () => {
  const projectPath = path.resolve("./.quarkflow/config.json");
  const projectFile = JSON.parse(fs.readFileSync(projectPath, "utf-8"));
  return parseProjectFile(projectFile);
};
