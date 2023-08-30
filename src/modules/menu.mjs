import inquirer from "inquirer";
import prompts from "../utils/prompts.mjs";

export const runMenu = () => {
  inquirer.prompt(prompts.MENU_PROMPTS.MAIN_MENU).then((answers) => {
    console.clear();
    switch (answers.actions) {
      case "workflows":
          //Launch Workflow Manager
         break;     
     case "scripts":
          //Launch Script Manager
          break;
    case "git":
        //Launch Git Manager
        break;
    case "bug":
        //Launch Bug Tracker
        break;
      default:
        process.exit(0);
    }
  });
};
