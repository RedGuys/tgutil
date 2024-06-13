#!/usr/bin/env node

const { program } = require('commander');

program
    .command("init <directory>")
    .description("Initialize a new project")
    .action(async (directory) => await require('./bin/init')(directory))

program
    .command("module:add <name>")
    .description("Adds module to project")
    .action(async (name) => await require('./bin/moduleAdd')(name))

program
    .command("module:list")
    .description("Lists all modules")
    .action(async () => await require('./bin/moduleList')())

program
    .command("scene:add <name>")
    .description("Adds scene to project")
    .action(async (name) => await require('./bin/sceneAdd')(name))

program
    .command("handler:add <name>")
    .description("Adds handler to project")
    .action(async (name) => await require('./bin/handlerAdd')(name))

program
    .command("command:add <name>")
    .description("Adds command to project")
    .action(async (name) => await require('./bin/commandAdd')(name))

program.parse();
