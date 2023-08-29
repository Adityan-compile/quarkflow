import ejs from "ejs";

export const render = (content, data)=>{
    return ejs.render(content, data);
};