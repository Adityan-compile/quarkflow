import { runSingleCommand, sleep as sysSleep } from "../../utils/execution.mjs";
import lme from "lme";
import { triggerWebhook } from "../../utils/webhook.mjs";

export const runWorkflow = async (workflow, sleep) => {
  let startTime = Date.now();

  workflow["pre-run"].forEach(async (command) => {
    await runSingleCommand(command.cmd, command.args);
    await sysSleep(Number(sleep));
  });

  if (workflow.concurrent) {
    workflow.commands.forEach(async (command) => {
      runSingleCommand(command.cmd, command.args);
    });
  
  // Run all the commands concurrently
  const commandPromises = workflow.commands.map(command=>{
    return runSingleCommand(command.cmd, command.args);
  });
  
  Promise.all(commandPromises)
    .then(() => {
      lme.i('Commands Finished Running Concurrently');
    })
    .catch((err) => {
      throw new Error(err);
    });
  } else {
    workflow.commands.forEach(async (command) => {
      await runSingleCommand(command.cmd, command.args);
      await sysSleep(Number(sleep));
    });
  }

  await sysSleep(Number(sleep));

  workflow["post-run"].forEach(async (command) => {
    await runSingleCommand(command.cmd, command.args);
    await sysSleep(Number(sleep));
  });

  const runtime = ((Date.now() - startTime) / 1000).toFixed(1);

  if (workflow.webhook && workflow.webhook.length !== 0) {
    triggerWebhook(workflow.webhook, {
      event: "workflow_success",
      data: {
        workflow,
        runtime,
      },
    });
    lme.i("Webhook Triggered");
  }

  lme.s(`Workflow Finished Running in: ${runtime} s`);
};

export const runScript = async (cmd, args) => {
  let startTime = Date.now();

  await runSingleCommand(cmd, args);

  lme.s(
    `Script Finished Running in: ${((Date.now() - startTime) / 1000).toFixed(
      1
    )} s`
  );
};
