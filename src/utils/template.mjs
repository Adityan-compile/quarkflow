import ejs from "ejs";
import pupa from "pupa";

export const renderTemplate = (content, data) => {
  return ejs.render(content, data);
};

export const parseProjectFile = (content) => {
  let parsed = {
    name: content.name,
    version: content.version,
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
      commands: [],
    };
    content.workflows[workflowItem].commands.forEach((commandItem) => {
      workflow.commands.push(
        pupa(
          commandItem,
          content.workflows[workflowItem].env
        )
      );
    });
    parsed.workflows[workflowItem] = workflow;
  });
  return parsed;
};
