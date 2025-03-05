import path from 'path';
import { writeFile } from '../utils/file.utils';

export const createGitig = async (project?: string) => {
  const gitig =
    'package-lock.json' +
    '\nnode_modules/' +
    '\n.evn' +
    '\nenvironment.ts' +
    '\nenvironments' +
    '\nbin/' +
    '\ndist/' +
    '\n.vscode/*' +
    '\n!.vscode/extensions.json' +
    '\n!.vscode/launch.json' +
    '\n!.vscode/tasks.json' +
    '\n.nx' +
    '\n.angular' +
    '\n';

  let gitFile = '.gitignore';
  if (project !== undefined) {
    gitFile = path.resolve(project, '.gitignore');
  }
  try {
    await writeFile(gitFile, gitig);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
