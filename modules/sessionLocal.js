const fs = require("fs");
const path = require("path");
const utils = require("../utils");

module.exports = {
    name: "SessionLocal",
    description: "Module who provides memory and file storage for sessions",
    dependencies: {
        "telegraf-session-local": "^2.1.1"
    },
    devDependencies: {

    },
    version: "1.0.0",
    params: {
        storage: "memory",
        file: "sessions.json"
    },
    ask: async (rl) => {
        let storage = "";
        while (!["memory","file","asyncfile"].includes(storage)) {
            storage = await utils.ask(rl, "Enter storage type (memory/file/asyncfile)", "memory");
        }
        module.exports.params.storage = storage;
        if(["file","asyncfile"].includes(module.exports.params.storage)) {
            module.exports.params.file = await utils.ask(rl, "Enter file log", "sessions.json");
        }
    },
    patch: () => {
        let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");
        let requires = utils.getEndOfBlock(index, "REQUIRES");
        index = index.slice(0, requires) + `const Session = require("telegraf-session-local");` + index.slice(requires);
        let init = utils.getStartOfBlock(index, "MIDDLEWARES");
        let options = `{storage: Session.${module.exports._mapStorage[module.exports.params.storage]}${module.exports.params.storage.endsWith("file")?`, database: "${module.exports.params.file}"`:""}}`;
        index = index.slice(0, init) + `
bot.use((new Session(${options})).middleware());` + index.slice(init);
        fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    },
    _mapStorage: {
        "memory": "storageMemory",
        "file": "storageFileSync",
        "asyncfile": "storageFileAsync"
    }
}