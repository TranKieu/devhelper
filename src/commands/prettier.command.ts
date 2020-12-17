import chalk from 'chalk';

import { writeFile } from '../utils/file.utils';

export const createPrettier = async (fileName: string) => {
  const prettier = {
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 80,
    useTabs: false,
    tabWidth: 2,
    semi: true,
    bracketSpacing: true,
    endOfLine: 'lf'
  };

  try {
    await writeFile('.prettierrc', JSON.stringify(prettier, undefined, 5));
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
