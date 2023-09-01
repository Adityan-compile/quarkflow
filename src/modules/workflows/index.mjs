import inquirer from "inquirer";
import { get } from "../state/index.mjs";
import prompts from "../../utils/prompts.mjs";
import { runScript, runWorkflow } from "./runner.mjs";

import lme from "lme";

export const launchWorkflowManager = () => {
  const currentProject = get("project");
  const workflowKeys = Object.keys(currentProject.workflows);
  if (workflowKeys.length === 0) {
    lme.e("No Workflows Found");
    return process.exit(0);
  }
  inquirer
    .prompt(prompts.MENU_PROMPTS.WORKFLOW_MANAGER_MENU.createMenu(workflowKeys))
    .then((answer) => {
      console.clear();
      const workflow = currentProject.workflows[answer.workflow];
      const sleep = currentProject.sleep;
      runWorkflow(workflow, sleep);
    });
};

export const launchScriptManager = () => {
  const currentProject = get("project");
  const scriptKeys = Object.keys(currentProject.scripts);
  if (scriptKeys.length === 0) {
    lme.e("No Scripts Found");
    return process.exit(0);
  }
  inquirer
    .prompt(prompts.MENU_PROMPTS.SCRIPT_MANAGER_MENU.createMenu(scriptKeys))
    .then((answer) => {
      console.clear();
      const script = currentProject.scripts[answer.script];
      runScript(script.cmd, script.args);
    });
};

export const runWorkflowUninteractively = (workflowName) => {
  const project = get("project");
  const workflow = project.workflows[workflowName];
  if (!workflow) {
    throw new Error("Workflow Not Found");
  }
  runWorkflow(workflow, project.sleep);
};

export const runScriptUninteractively = (scriptName) => {
  const project = get("project");
  const script = project.scripts[scriptName];
  if (!script) {
    throw new Error("Script Not Found");
  }
  runScript(script.cmd, script.args);
};
