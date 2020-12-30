import chalk from 'chalk';
import { writeFile } from '../utils/file.utils';

export const createGitig = async (fileName: string) => {
  const gitig =
    'package-lock.json' +
    '\n .vscode/' +
    '\n node_modules/ ' +
    '\n .evn ' +
    '\n bin/' +
    '\n dist/' +
    '\n';

  try {
    await writeFile(fileName, gitig);
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
