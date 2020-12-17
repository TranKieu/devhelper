#!/usr/bin/env node

import program from 'commander';
import chalk from 'chalk';

// Commands
import { createPrettier } from './commands/prettier.command';
import { createBabel } from './commands/babel.command';

const VERSION = '1.0.0';
const NAME = 'generate';

const COMMANDS = {
  prettier: { CM: 'prettier', alias: 'p', name: '.prettierrc' },
  babel: { CM: 'babel', alias: 'b', name: '.babelrc' }
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
  .alias(COMMANDS.prettier.alias)
  .description(`Create new ${COMMANDS.prettier.name} File!`)
  .action(() => createPrettier(COMMANDS.prettier.name));

program
  .command(COMMANDS.babel.CM)
  .alias(COMMANDS.babel.alias)
  .description(`Create new ${COMMANDS.babel.name} File!`)
  .action(() => createBabel(COMMANDS.babel.name));

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
  Object.entries(COMMANDS).forEach(([key, value]) =>
    console.log(
      `Commands: \t ${NAME} ${value.CM} | ${value.alias} \t Create new ${value.name} File.\n`
    )
  );
}
