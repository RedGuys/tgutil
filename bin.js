#!/usr/bin/env node

const { program } = require('commander');

program
    .command("init <directory>")
    .description("Initialize a new project")
    .action(async (directory) => await require('./init')(directory))

program.parse();
