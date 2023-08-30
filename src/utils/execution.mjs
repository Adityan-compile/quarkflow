import { spawn } from "child_process";

export const runSingleCommand = (command) => {
  return new Promise((resolve, reject) => {
    let startTime = Date.now();
    spawn(command, {
      stdio: [process.stdin, process.stdout, process.stderr],
    }).on("close", () => resolve(Date.now() - startTime));
  });
};
