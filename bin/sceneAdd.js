const path = require('path');
const fs = require('fs');
const utils = require('../utils');

module.exports = async function (name) {
    //checks if scenes folder exists in current directory
    if (!fs.existsSync(path.join(process.cwd(), "scenes"))) {
        fs.mkdirSync(path.join(process.cwd(), "scenes"));
    }
    //checks if scene exists
    if (fs.existsSync(path.join(process.cwd(), "scenes", name + ".js"))) {
        console.log(`Scene ${name} already exists`);
        return;
    }
    //copy scene template
    fs.copyFileSync(path.join(__dirname, "..", "dist", "scene.js"), path.join(process.cwd(), "scenes", name + ".js"));
    let content = fs.readFileSync(path.join(process.cwd(), "scenes", name + ".js"), "utf-8");
    content = content.replaceAll("example", name);
    fs.writeFileSync(path.join(process.cwd(), "scenes", name + ".js"), content);
    //add scene to index.js
    let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");
    let scenes = utils.getStartOfBlock(index, "SCENES");
    index = index.slice(0, scenes) + `stage.register(require("./scenes/${name}"));` + index.slice(scenes);
    fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    console.log(`Scene ${name} added successfully`);
}