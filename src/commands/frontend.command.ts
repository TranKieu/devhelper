import { createGitig } from './gitig.command';
import { createPrettier } from './prettier.command';
import chalk from 'chalk';
import { isExists, mkDir } from '../utils/file.utils';
import { createPackage } from '../utils/create.package';

export const frontend = async (projectName: string) => {
  /** package */
  const main = 'src/index.html';
  const scripts = {
    build: 'parcel build src/index.html --no-minify --out-dir out --no-cache',
    dev: 'parcel src/index.html --no-cache'
  };
  const devDependencies: string[] = ['parcel-bundler', 'sass'];

  /**
   * 1. Tạo Project theo name
   * 2. Tạo package.json
   * 3. Tạo .prettierrc
   * 4. Tạo gitignore
   */
  if (await isExists(projectName)) {
    console.error(
      chalk.red.bold('Error!'),
      `\t Directory ${projectName} already exist!`
    );
    process.exit(1);
  }

  console.log();
  console.log('\t Create Project: ', chalk.green.bold(projectName));
  console.log('\t ***************\n');

  await mkDir(projectName);

  await createPackage(projectName, main, scripts, devDependencies);

  await createPrettier(projectName);
  await createGitig(projectName);
  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};
