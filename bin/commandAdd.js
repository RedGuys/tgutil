const path = require('path');
const fs = require('fs');
const utils = require('../utils');

module.exports = async function (name) {
    //checks if scenes folder exists in current directory
    if (!fs.existsSync(path.join(process.cwd(), "commands"))) {
        fs.mkdirSync(path.join(process.cwd(), "commands"));
    }
    //checks if scene exists
    if (fs.existsSync(path.join(process.cwd(), "commands", name + ".js"))){
        console.log(`Command ${name} already exists`);
        return;
    }
    //copy scene template
    fs.copyFileSync(path.join(__dirname, "..", "dist", "command.js"), path.join(process.cwd(), "commands", name + ".js"));
    //add scene to index.js
    let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");
    let scenes = utils.getEndOfBlock(index, "COMMANDS");
    index = index.slice(0, scenes) + `bot.command("${name}", require("./commands/${name}")(bot));` + index.slice(scenes);
    fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    console.log(`Command ${name} added successfully`);
}