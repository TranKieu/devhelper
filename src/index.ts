#!/usr/bin/env node

import program from 'commander';
import chalk from 'chalk';

// Commands
import { createPrettier } from './commands/prettier.command';

const VERSION = '1.0.0';
const NAME = 'create';

const COMMANDS = {
  prettier: 'prettier'
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
  .command(COMMANDS.prettier)
  .alias('p')
  .description('Create new .prettierrc File!')
  .action(() => createPrettier());

// parse
program.parse(process.argv);

// Infor
const information = () => {
  console.log(`Usage: ${NAME} [command] <command>`);

  console.log('\n Develope Helper \n');

  // Command
  console.log(`Commands:   ${COMMANDS.prettier}  \t Create new .prettierrc\n`);
};
