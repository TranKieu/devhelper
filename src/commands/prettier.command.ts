import chalk from 'chalk';

import { writeFile } from '../utils/file.utils';

export const createPrettier = async () => {
  const prettier = {
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 80,
    useTabs: false,
    tabWidth: 2,
    semi: true,
    bracketSpacing: true
  };

  try {
    await writeFile('.prettierrc', JSON.stringify(prettier, undefined, 5));
    console.log(
      '\t File %s created succesfully!',
      chalk.green.bold('.prettierrc')
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
