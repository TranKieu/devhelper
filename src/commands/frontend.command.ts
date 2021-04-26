import { isExists, mkDir, writeFile } from '../utils/file.utils';
import { createGitig } from './gitig.command';
import { createPrettier } from './prettier.command';
import chalk from 'chalk';
import { lastest } from '../utils/lastversion';
import path from 'path';

export const frontend = async (projectName: string) => {
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
  // chưa tồn tại tạo mới
  await mkDir(projectName);
  const packageJson = new PackageJson();
  packageJson.devDependencies['parcel-bundler'] = (await lastest(
    'parcel-bundler'
  )) as string;
  packageJson.devDependencies['sass'] = (await lastest('sass')) as string;

  let pkgF = path.resolve(projectName, 'package.json');

  try {
    await writeFile(pkgF, JSON.stringify(packageJson, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  await createPrettier(projectName);
  await createGitig(projectName);
  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};

class PackageJson {
  name = '';
  version = '';
  main = 'src/index.html';

  scripts = {
    build: 'parcel build src/index.html --no-minify --out-dir out --no-cache',
    dev: 'parcel src/index.html --no-cache'
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