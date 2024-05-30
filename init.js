const utils = require('./utils');
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (directory) {
    const package = {
        "name": "test",
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "start": "node index.js"
        },
        "dependencies": {
            "telegraf": "3.38"
        },
        "keywords": [],
        "author": "",
        "license": "",
        "description": ""
    };
    const secrets = {
        token: "",
    };

    let dir = path.resolve(directory);
    package.name = path.basename(dir);
    let rl = utils.initRL();

    package.name = await utils.ask(rl, "Enter project name", package.name);
    secrets.token = await utils.ask(rl, "Enter your bot token");
    package.author = await utils.ask(rl, "Enter author name", os.userInfo().username);
    package.license = await utils.ask(rl, "Enter license", "MIT");
    package.description = await utils.ask(rl, "Enter description", " ");

    package.dependencies["telegraf"] = await utils.ask(rl, "Enter telegraf version", "3.38");

    utils.updateLine("- Initializing project...");
    fs.mkdirSync(dir, {recursive:true});
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(package, null, 2));
    fs.mkdirSync(path.join(dir, ".idea", "runConfigurations"), {recursive:true});
    fs.writeFileSync(path.join(dir, ".idea", "runConfigurations", "start.xml"), `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="start" type="js.build_tools.npm" nameIsGenerated="true">
    <package-json value="$PROJECT_DIR$/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="TOKEN" value="${secrets.token}" />
    </envs>
    <method v="2" />
  </configuration>
</component>`);
    fs.writeFileSync(path.join(dir, ".gitignore"), "node_modules\n.idea\n");
    fs.cpSync(path.join(__dirname, "dist", "index.js"), path.join(dir, "index.js"));
    utils.finishLine("- Project initialized!");

    utils.updateLine("- Installing dependencies...");
    await utils.npmInstall(dir);
    utils.finishLine("- Dependencies installed!");
    rl.close();
}