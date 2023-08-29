#! /usr/bin/env node

import  {init}  from "../src/cli.mjs";
import { Command } from "commander";
import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import updateNotifier from 'update-notifier';
import packageJson from '../package.json' assert {type: 'json'};


const program = new Command();

process.stdout.write(
  chalk.blue(
    boxen(
      gradient.passion(figlet.textSync("Quarkflow")),
      {
        padding: 1,
        borderStyle: "round",
      }
    )
  ) + '\n'
);

updateNotifier({pkg: packageJson}).notify();



program
  .name("Quarkflow")
  .description("A Developer Friendly Workflow Management tool")
  .version("0.0.1").action(()=>{});

program
  .command("init")
  .description("Initializes a quarkflow Project")
  .argument("<dir>", "Directory to initialize project")
  .action((dir, options) => {
    init(dir);
  });

program.parse(process.argv);
