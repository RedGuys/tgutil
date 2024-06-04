const path = require('path');
const fs = require('fs');

module.exports = async function () {
    //list file
    let modules = fs.readdirSync(path.join(__dirname, "..", "modules"));
    console.log("Modules:");
    modules.forEach((moduleName) => {
        let module = require(path.join(__dirname, "..", "modules", moduleName));
        console.log(`- ${moduleName.replace(".js", "")}@${module.version} (${module.name}) - ${module.description}`);
    });
}