
import { createProject } from "./utils/project.mjs";
import inquirer from "inquirer";
import prompts from "./utils/prompts.mjs";
import lme from 'lme';


export const init = (dir) => {
  inquirer
    .prompt(prompts.INIT_PROMPTS)
    .then((answers) => {
      if (answers.name.length === 0 && template === "Empty")
        answers.name = "quarkflow_project";
      if (answers.name.length === 0 && template !== "Empty")
        answers.name = `${answers.template.toLowerCase()}_project`;
      createProject(answers.template, answers.name, answers.sleep,dir);
    })
    .catch((err) => lme.e(err));
};
