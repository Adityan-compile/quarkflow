import { runSingleCommand, sleep as sysSleep } from "../../utils/execution.mjs";
import lme from "lme";

export const runWorkflow = async (workflow, sleep) => {
  let startTime = Date.now();

  workflow["pre-run"].forEach(async (command) => {
    await runSingleCommand(command.cmd, command.args);
    await sysSleep(Number(sleep));
  });

  workflow.commands.forEach(async (command) => {
    await runSingleCommand(command.cmd, command.args);
    await sysSleep(1000);
  });

  workflow["post-run"].forEach(async (command) => {
    await runSingleCommand(command.cmd, command.args);
    await sysSleep(Number(sleep));
  });

  lme.s(`Workflow Finished Running in: ${((Date.now() - startTime) / 1000).toFixed(1)} s`);
};

export const runScript = async (cmd, args) => {
  let startTime = Date.now();

  await runSingleCommand(cmd, args);

  lme.s(`Script Finished Running in: ${((Date.now() - startTime) / 1000).toFixed(1)} s`);
};
