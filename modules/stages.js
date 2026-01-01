const fs = require("fs");
const path = require("path");
const utils = require("../utils");

module.exports = {
    name: "Stages module",
    description: "Module who provides stages for bot",
    dependencies: {},
    devDependencies: {},
    version: "1.0.0",
    params: {},
    ask: async (rl) => {
    },
    patch: () => {
        let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");

        let requires = utils.getEndOfBlock(index, "REQUIRES");
        index = index.slice(0, requires) + `const Stage = require("regraf/stage");` + index.slice(requires);

        let init = utils.getEndOfBlock(index, "INITIALIZE");
        index = index.slice(0, init) + `let stage = new Stage();` + index.slice(init);

        let scenes = utils.getEndOfBlock(index, "SCENES");
        index = index.slice(0, scenes) + `bot.use(stage.middleware());` + index.slice(scenes);

        fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    }
}