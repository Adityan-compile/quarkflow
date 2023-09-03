import path from "path";
import fs from "fs";
export const checkRepositoryExists = () => {
    const repoPath = path.resolve("./.git");
    if (fs.existsSync(repoPath)) {
      return true;
    } else {
      return false;
    }
  };