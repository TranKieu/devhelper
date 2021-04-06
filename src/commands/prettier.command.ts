import * as path from 'path';
import { writeFile } from '../utils/file.utils';

export const createPrettier = async (project?: string) => {
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
  const prettierig =
    'node_modules\n' + 'dist\n' + '*.md\n' + '*.css\n' + '*.js\n' + '\n';

  let prettierFile = '.prettierrc';
  let prettierigFile = '.prettierignore';
  if (project !== undefined) {
    prettierFile = path.resolve(project, '.prettierrc');
    prettierigFile = path.resolve(project, '.prettierignore');
  }

  try {
    await writeFile(prettierFile, JSON.stringify(prettier, undefined, 2));
    await writeFile(prettierigFile, prettierig);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
