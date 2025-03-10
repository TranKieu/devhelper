#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

// Commands
import { createPrettier } from './commands/prettier.command';
import { initTs } from './commands/init.commad';
import { frontend } from './commands/frontend.command';
import { createGitig } from './commands/gitig.command';
import { tailwind } from './commands/tailwind.command';
import { createGuard } from './commands/guard.command';

/* deprecated */
// import { createBabel } from './commands/babel.command';
// import { createPackage } from './commands/package.command';
// import { createTsConfig } from './commands/tsconfig.command';

const VERSION = '2.0.0';
const NAME = 'generate';

const COMMANDS = {
  prettier: { CM: 'prettier', name: '.prettierrc' },
  gitignore: { CM: 'gitig', name: '.gitignore' },
  init: { CM: 'init <project>', name: '' },

  frontend: { CM: 'front <project>', name: 'FrontEnd-Project' },
  tailwind: { CM: 'tailwind <project>', name: 'TailwindCSS-Start' },

  guard: { CM: 'guard <name> [macht|deactivate]', name: 'Angular Guard' }
};

/**
 * tsconfig: { CM: 'tsconfig', name: 'tsconfig.json' },
 * package: { CM: 'package', name: 'package.json' },
 * babel: { CM: 'babel', name: '.babelrc' },
 */

const program = new Command();
program
  .version(VERSION)
  .name(NAME)
  .description('Develope Helper')
  .arguments('<command>')
  .action((command) => {
    console.log('Command %s does not exits!', chalk.red.bold(command));
    information();
  });
// Commands

// guard
program
  .command(COMMANDS.guard.CM)
  .alias('g')
  .description(`Create new ${COMMANDS.guard.name} File!`)
  .action((pathfile, options) => createGuard(pathfile, options));

// prettier
program
  .command(COMMANDS.prettier.CM)
  .alias('p')
  .description(`Create new ${COMMANDS.prettier.name} File!`)
  .action(() => createPrettier());

// gitignore
program
  .command(COMMANDS.gitignore.CM)
  .description(`Create new ${COMMANDS.gitignore.name} File!`)
  .action(() => createGitig());

// Typescript Project
program
  .command(COMMANDS.init.CM)
  .action(async (project) => await initTs(project));

// Frontend
program
  .command(COMMANDS.frontend.CM)
  .alias('f')
  .description(`Create new ${COMMANDS.frontend.name} File!`)
  .action(async (project) => await frontend(project));

// Tailwind CSS
program
  .command(COMMANDS.tailwind.CM)
  .description(`Create new ${COMMANDS.tailwind.name} File!`)
  .action((project) => tailwind(project));

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
    console.log(`Commands:  ${NAME} ${CM} \t Create new ${name}.\n`)
  );
}

// tsconfig.json
// program
//   .command(COMMANDS.tsconfig.CM)
//   .description(`Create new ${COMMANDS.tsconfig.name} File!`)
//   .action(() => createTsConfig(COMMANDS.tsconfig.name));

// package.json
// program
//   .command(COMMANDS.package.CM)
//   .description(`Create new ${COMMANDS.package.name} File!`)
//   .action(() => createPackage(COMMANDS.package.name));

// program
//   .command(COMMANDS.babel.CM)
//   .description(`Create new ${COMMANDS.babel.name} File!`)
//   .action(() => createBabel(COMMANDS.babel.name));
