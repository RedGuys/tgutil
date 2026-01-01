const path = require('path');
const fs = require('fs');
const child = require('child_process');
const utils = require('../utils');

module.exports = async function (name) {
    let file = path.join(__dirname, "..", "modules", name + ".js");
    if (!fs.existsSync(file)) {
        console.log(`Module ${name} not found`);
        return;
    }
    let packageFile = path.join(process.cwd(), "package.json");
    if (!fs.existsSync(packageFile)) {
        console.log("Project not initialized. Run 'init' command first.");
        return;
    }
    let module = require(file);

    let rl = utils.initRL();
    if (module.ask)
        await module.ask(rl);

    utils.updateLine("- Registering module...");
    let package = require(packageFile);
    if (!package.dependencies) {
        package.dependencies = {};
    }
    for (let dep in module.dependencies) {
        package.dependencies[dep] = module.dependencies[dep];
    }
    if (!package.devDependencies) {
        package.devDependencies = {};
    }
    for (let dep in module.devDependencies) {
        package.devDependencies[dep] = module.devDependencies[dep];
    }
    if (!package.modules) {
        package.modules = {};
    }
    package.modules[name] = module.version;
    fs.writeFileSync(packageFile, JSON.stringify(package, null, 2));
    utils.finishLine("- Module registered!");

    utils.updateLine("- Installing dependencies...");
    child.execSync("npm install");
    utils.finishLine("- Dependencies installed!");

    utils.updateLine("- Patching project...");
    module.patch();
    utils.finishLine("- Project patched!");
    console.log("Module added successfully!");
    rl.close();
}