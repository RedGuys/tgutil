const fs = require("fs");
const path = require("path");
const utils = require("../utils");

module.exports = {
    name: "Log4JS",
    description: "Log4JS logging module",
    dependencies: {
        "log4js": "^6.9.1"
    },
    devDependencies: {

    },
    version: "1.0.0",
    params: {
        stdOutLevel: "info",
        logToFile: false,
        file: "latest.log",
    },
    ask: async (rl) => {
        module.exports.params.stdOutLevel = await utils.ask(rl, "Enter stdout log level", "info");
        module.exports.params.logToFile = await utils.askYN(rl, "Log to file? (y/n)", "N");
        if(module.exports.params.logToFile) {
            module.exports.params.file = await utils.ask(rl, "Enter file log", "latest.log");
        }
    },
    patch: () => {
        let index = fs.readFileSync(path.join(process.cwd(), "index.js"), "utf-8");
        let requires = utils.getEndOfBlock(index, "REQUIRES");
        index = index.slice(0, requires) + `const log4js = require("log4js");` + index.slice(requires);
        let init = utils.getStartOfBlock(index, "INITIALIZE");
        let settings = {
            appenders: {
                out: {
                    type: 'stdout'
                },
            }, categories: {default: {appenders: ['out'], level: module.exports.params.stdOutLevel}}
        };
        if(module.exports.params.logToFile) {
            settings.appenders.file = {
                type: 'file',
                filename: module.exports.params.file
            };
            settings.categories.default.appenders.push("file");
        }
        index = index.slice(0, init) + `
log4js.configure(${JSON.stringify(settings)});
const logger = log4js.getLogger("Main");` + index.slice(init);
        fs.writeFileSync(path.join(process.cwd(), "index.js"), index);
    }
}