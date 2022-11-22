import chalk from 'chalk';
import path from 'path';
import { copyDir, isExists } from '../utils/file.utils';
import { createPackage } from '../utils/create.package';
import { createGitig } from './gitig.command';
import { createPrettier } from './prettier.command';

export const tailwind = async (projectName: string) => {
  /** package */
  const main = 'public/index.html';
  const scripts = {
    build: 'postcss ./src/tailwind.css -o ./public/css/styles.css --verbose',
    prod: 'postcss ./src/tailwind.css -o ./public/css/styles.css --env production --verbose'
  };

  const devDependencies: string[] = [
    'autoprefixer',
    'tailwindcss',
    'postcss-cli',
    'cssnano'
  ];

  /** Create Dir */
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
  /** Copy Template */
  const prjTpl = path.resolve(__dirname, '../templates/tailwind');
  await copyDir(prjTpl, projectName);

  // package
  await createPackage(projectName, main, scripts, devDependencies);
  await createPrettier(projectName);
  await createGitig(projectName);
  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};
