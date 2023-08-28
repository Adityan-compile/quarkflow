import path from "path";

const createProject = (template, name)=>{

    
    
    const templatePath = path.resolve(`../templates/${template}`);
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        
        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');            // write file to destination folder
            const writePath = path.join(CURR_DIR, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));            // copy files/folder inside current folder recursively
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
    
};