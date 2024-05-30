const readline = require("readline");
const cp= require("child_process");

module.exports = class Utils {
    static ask(rl, question, defaultValue) {
        let text = question;
        if(defaultValue) {
            text += ` [${defaultValue}]`;
        }
        text += ": ";
        return new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                if(answer.trim() === "") {
                    if (defaultValue) {
                        resolve(defaultValue);
                    } else {
                        console.log("Please enter a value");
                        return this.ask(rl, question, defaultValue);
                    }
                }
                resolve(answer.trim());
            });
        });
    }

    static askYN(rl, question, defaultValue) {
        let text = question;
        if(defaultValue) {
            text += ` [${defaultValue ? "Y" : "N"}]`;
        }
        text += ": ";
        return new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                if(answer.trim() === "") {
                    resolve(defaultValue);
                }
                if(answer.trim().toLowerCase() === "y") {
                    resolve(true);
                } else if(answer.trim().toLowerCase() === "n") {
                    resolve(false);
                } else {
                    console.log("Please enter Y or N");
                    return this.askYN(rl, question, defaultValue);
                }
            });
        });
    }

    static initRL() {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    static updateLine(text) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(text);
    }

    static finishLine(text) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        console.log(text);
    }

    static npmInstall(dir) {
        return new Promise((resolve, reject) => {
            let child = cp.exec("npm install", {cwd: dir});
            child.on("exit", (code) => {
                if(code === 0) {
                    resolve();
                } else {
                    reject(new Error("npm install failed"));
                }
            });
        });
    }
}