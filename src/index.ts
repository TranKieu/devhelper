#!/usr/bin/env node

import program from 'commander';
import chalk from 'chalk';

// Commands
import { createPrettier } from './commands/prettier.command';
import { createBabel } from './commands/babel.command';
import { createGitig } from './commands/gitig.command';
import { createTsConfig } from './commands/tsconfig.command';
import { createPackage } from './commands/package.command';
import { initTs } from './commands/init.commad';
import { frontend } from './commands/frontend.command';

const VERSION = '1.0.0';
const NAME = 'generate';

const COMMANDS = {
  prettier: { CM: 'prettier', name: '.prettierrc' },
  babel: { CM: 'babel', name: '.babelrc' },
  gitignore: { CM: 'gitig', name: '.gitignore' },
  tsconfig: { CM: 'tsconfig', name: 'tsconfig.json' },
  package: { CM: 'package', name: 'package.json' },
  init: { CM: 'init', name: '' },
  frontend: { CM: 'front <project>', name: 'FrontEnd-Project' }
};

program
  .version(VERSION)
  .name(NAME)
  .description('Helper')
  .arguments('<command>')
  .action((command) => {
    console.log('Command %s does not exits!', chalk.red.bold(command));
    information();
  });

// Commands
program
  .command(COMMANDS.prettier.CM)
  .alias('p')
  .description(`Create new ${COMMANDS.prettier.name} File!`)
  .action(() => createPrettier());

program
  .command(COMMANDS.babel.CM)
  .description(`Create new ${COMMANDS.babel.name} File!`)
  .action(() => createBabel(COMMANDS.babel.name));

// gitignore
program
  .command(COMMANDS.gitignore.CM)
  .description(`Create new ${COMMANDS.gitignore.name} File!`)
  .action(() => createGitig());

// tsconfig.json
program
  .command(COMMANDS.tsconfig.CM)
  .description(`Create new ${COMMANDS.tsconfig.name} File!`)
  .action(() => createTsConfig(COMMANDS.tsconfig.name));

// package.json
program
  .command(COMMANDS.package.CM)
  .description(`Create new ${COMMANDS.package.name} File!`)
  .action(() => createPackage(COMMANDS.package.name));

// Backend
program.command(COMMANDS.init.CM).action(() => initTs());

// Frontend
program
  .command(COMMANDS.frontend.CM)
  .alias('p')
  .description(`Create new ${COMMANDS.frontend.name} File!`)
  .action((project) => frontend(project));

// parse
program.parse(process.argv);

// unsupported command
if (process.argv.length < 2) {
  information();
}

// Infor
function information() {
  console.log(`Usage: ${NAME} [command] <command>`);

  console.log('\n Develope Helper \n');

  // Command
  Object.entries(COMMANDS).forEach(([key, { CM, name }]) =>
    console.log(`Commands: \t ${NAME} ${CM} \t Create new ${name} File.\n`)
  );
}
