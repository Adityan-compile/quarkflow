
import { checkProjectExists, createProject, readAndParseProject } from "./utils/project.mjs";
import inquirer from "inquirer";
import prompts from "./utils/prompts.mjs";
import lme from 'lme';
import { runMenu } from "./modules/menu.mjs";
import {
  set
} from "./modules/state/index.mjs";


export const init = (dir) => {
  inquirer
    .prompt(prompts.INIT_PROMPTS, {
      clearPromptOnDone: true
    })
    .then((answers) => {
      console.clear();
      if (answers.name.length === 0 && template === "Empty")
        answers.name = "quarkflow_project";
      if (answers.name.length === 0 && template !== "Empty")
        answers.name = `${answers.template.toLowerCase()}_project`;
      createProject(answers.template, answers.name, answers.sleep,dir, false);
    })
    .catch((err) => lme.e(err));
};

export const initForce = (dir)=>{
  createProject("Empty", "quarkflow_project", 1000, dir, true);
};


export const searchAndRunMenu = ()=>{
  if(checkProjectExists()){
    const project = readAndParseProject();
    set('project', project);
    runMenu();
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
};






