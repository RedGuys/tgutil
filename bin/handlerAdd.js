const path = require('path');
const fs = require('fs');
const utils = require('../utils');

module.exports = async function (name) {
    //checks if scenes folder exists in current directory
    if (!fs.existsSync(path.join(process.cwd(), "handlers"))) {
        fs.mkdirSync(path.join(process.cwd(), "handlers"));
    }
    //checks if scene exists
    if (fs.existsSync(path.join(process.cwd(), "handlers", name + ".js"))) {
        console.log(`Handler ${name} already exists`);
        return;
    }
    //copy scene template
    fs.copyFileSync(path.join(__dirname, "..", "dist", "handler.js"), path.join(process.cwd(), "handlers", name + ".js"));
    //add scene to index.js
    let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");
    let scenes = utils.getEndOfBlock(index, "HANDLERS");
    index = index.slice(0, scenes) + `require("./handlers/${name}")(bot)` + index.slice(scenes);
    fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    console.log(`Handler ${name} added successfully`);
}