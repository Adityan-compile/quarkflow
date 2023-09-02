import { spawn } from "child_process";


export const runSingleCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    let startTime = Date.now();
    spawn(command, [...args], {
      shell: true,
      stdio: [process.stdin, process.stdout, process.stderr],
      cwd: process.cwd(),
    })
      .on("close", () => resolve(Date.now() - startTime))
      .on("error", (err) => {
        throw new(err);
      }).on('uncaughtException', function (err) {
        throw new Error(err);
      });
  });
};

export const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));



export const runCommandAsPromise = (command) => {
    return new Promise((resolve, reject) => {
      const childProcess = spawn(command.cmd,command.args, {
        shell: true, 
        stdio: [process.stdin, process.stdout, process.stderr],
        cwd: process.cwd(),
      });
  
      childProcess.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command '${command}' exited with code ${code}`));
        }
      });
  
      childProcess.on('error', (err) => {
        reject(err);
      });
    });
  }
  