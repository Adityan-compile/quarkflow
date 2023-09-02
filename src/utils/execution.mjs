import { spawn } from "child_process";
import lme from "lme";

export const runSingleCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, [...args], {
      shell: true,
      stdio: [process.stdin, process.stdout, process.stderr],
      cwd: process.cwd(),
    });
    childProcess.on("error", (err)=>{
      throw new Error(err);
    });
    childProcess.on("exit", (code) => {
      lme.s(`Process ended with ${code}`);
      if(code !== 0) return reject(new Error(`Command '${command}' exited with code ${code}`));;
      resolve();
    });
  });
};

export const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));
