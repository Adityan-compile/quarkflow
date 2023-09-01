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
    let parsedScript = pupa(content.scripts[item], content.env);
    parsedScript = parsedScript.split(" ");
    parsed.scripts[item] = {
      cmd: parsedCommand[0],
      args: parsedCommand.slice(1)
    };
  });
  const workflowKeys = Object.keys(content.workflows);
  workflowKeys.forEach((workflowItem, idx) => {
    let workflow = {
      "pre-run": [],
      "post-run": [],
      commands: [],
    };
    content.workflows[workflowItem].commands.forEach((commandItem) => {
      let parsedCommand = pupa(commandItem, content.workflows[workflowItem].env);
      parsedCommand = parsedCommand.split(" ");
      if(scriptKeys.includes(parsedCommand[0])){
        const parsedScript = parsed.scripts[parsedCommand[0]];
        const args = parsed.scripts.slice(1);
        workflow.commands.push(
          {
            cmd: parsedScript.cmd,
            args: args
          }
        );
      }else{
        workflow.commands.push(
          {
            cmd: parsedCommand[0],
            args: parsedCommand.slice(1)
          }
        );
      }
    });
   
    content.workflows[workflowItem]['pre-run'].forEach((preRunItem) => {
      let parsedCommand = pupa(preRunItem, content.workflows[workflowItem].env);
      parsedCommand = parsedCommand.split(" ");
      if(scriptKeys.includes(parsedCommand[0])){
        const parsedScript = parsed.scripts[parsedCommand[0]];
        const args = parsed.scripts.slice(1);
        workflow['pre-run'].push(
          {
            cmd: parsedScript.cmd,
            args: args
          }
        );
      }else{
        workflow['pre-run'].push(
          {
            cmd: parsedCommand[0],
            args: parsedCommand.slice(1)
          }
        );
      }
    });

    content.workflows[workflowItem]['post-run'].forEach((postRunItem) => {
      let parsedCommand = pupa(postRunItem, content.workflows[workflowItem].env);
      parsedCommand = parsedCommand.split(" ");
      if(scriptKeys.includes(parsedCommand[0])){
        const parsedScript = parsed.scripts[parsedCommand[0]];
        const args = parsed.scripts.slice(1);
        workflow['post-run'].push(
          {
            cmd: parsedScript.cmd,
            args: args
          }
        );
      }else{
        workflow['post-run'].push(
          {
            cmd: parsedCommand[0],
            args: parsedCommand.slice(1)
          }
        );
      }
    });

    parsed.workflows[workflowItem] = workflow;
  });

  return parsed;
};
