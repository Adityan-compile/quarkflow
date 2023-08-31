import ejs from "ejs";
import pupa from "pupa";

export const renderTemplate = (content, data) => {
  return ejs.render(content, data);
};

export const parseProjectFile = (content) => {
  let parsed = {
    name: content.name,
    version: content.version,
    sleep: content.sleep,
    workflows: {},
    scripts: {},
  };
  const scriptKeys = Object.keys(content.scripts);
  scriptKeys.forEach((item, idx) => {
    parsed.scripts[item] = pupa(content.scripts[item], content.env);
  });
  const workflowKeys = Object.keys(content.workflows);
  workflowKeys.forEach((workflowItem, idx) => {
    let workflow = {
      "pre-run": content.workflows[workflowItem]["pre-run"],
      "post-run": content.workflows[workflowItem]["post-run"],
      commands: [],
    };
    content.workflows[workflowItem].commands.forEach((commandItem) => {
      let parsedCommands = pupa(commandItem, content.workflows[workflowItem].env);
      parsedCommands = parsedCommands.split(" ");
      workflow.commands.push(
        {
          cmd: parsedCommands[0],
          args: parsedCommands.slice(1)
        }
      );
    });
    parsed.workflows[workflowItem] = workflow;
  });
  return parsed;
};
