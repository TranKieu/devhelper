import chalk from 'chalk';
import { writeFile } from '../utils/file.utils';

export const createGitig = async (fileName: string) => {
  const gitig =
    'package-lock.json' +
    '\n.vscode/' +
    '\nnode_modules/ ' +
    '\n.evn ' +
    '\nbin/' +
    '\ndist/' +
    '\n';

  try {
    await writeFile(fileName, gitig);
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
