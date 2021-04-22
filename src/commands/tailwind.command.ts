import chalk from 'chalk';
import { lastest } from '../utils/lastversion';
import path from 'path';
import { copyDir, isExists, writeFile } from '../utils/file.utils';

export const tailwind = async (projectName: string) => {
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
  const prjTpl = path.resolve(__dirname, '../templates/tailwind');
  await copyDir(prjTpl, projectName);

  // package
  const packageJson = new PackageJson();
  packageJson.devDependencies['autoprefixer'] = (await lastest(
    'autoprefixer'
  )) as string;
  packageJson.devDependencies['tailwindcss'] = (await lastest(
    'tailwindcss'
  )) as string;
  packageJson.devDependencies['postcss-cli'] = (await lastest(
    'postcss-cli'
  )) as string;
  packageJson.devDependencies['cross-env'] = (await lastest(
    'cross-env'
  )) as string;

  let pkgF = path.resolve(projectName, 'package.json');

  try {
    await writeFile(pkgF, JSON.stringify(packageJson, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};

class PackageJson {
  name = 'tailwind';
  version = '1.0.0';
  description = ';';
  main = 'public/index.html';

  scripts = {
    build: 'postcss ./src/styles.css -o ./public/css/styles.css',
    prod:
      'cross-env NODE_ENV=production postcss ./src/styles.css -o ./public/css/styles.css'
  };

  devDependencies: {
    [key: string]: string;
  } = {};
  dependencies: {
    [key: string]: string;
  } = {};

  author = 'tranvd2010 <tranvd2010@gmail.com>';
  homepage = 'https://trankieu.github.io/';
  license = '';
}
