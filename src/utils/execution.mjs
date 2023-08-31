import { spawn } from "child_process";
import lme from "lme";
export const runSingleCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    let startTime = Date.now();
    spawn(command, [...args],{
      stdio: [process.stdin, process.stdout, process.stderr],
      cwd: process.cwd(),

    })
      .on("close", () => resolve(Date.now() - startTime))
      .on("error", (err) => lme.e(err));
  });
};

export const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));
