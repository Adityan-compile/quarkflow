import inquirer from "inquirer";
import {
    get
} from "../state/index.mjs";
import prompts from "../../utils/prompts.mjs";
import { runWorkflow } from "./runner.mjs";



export const launchWorkflowManager = ()=>{
    const currentProject = get('project');
    const workflowKeys = Object.keys(currentProject.workflows);
    inquirer.prompt(prompts.MENU_PROMPTS.WORKFLOW_MANAGER_MENU.createMenu(workflowKeys)).then(answer=>{
        const workflow = currentProject.workflows[answer.workflow];
        const sleep = currentProject.sleep;
        runWorkflow(workflow, sleep);
    });
};

export const launchScriptManager = ()=>{};