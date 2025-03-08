import { createGitig } from './gitig.command';
import { createPrettier } from './prettier.command';
import { createTsConfig } from './tsconfig.command';
import { createPackage } from '../utils/create.package';
import { isExists, writeFile, mkDir } from '../utils/file.utils';
import chalk from 'chalk';
import path from 'path';

export const initTs = async (projectName: string) => {
  /** package */
  const main = 'src/index.ts';
  const scripts = {
    start: 'node dist/index',
    build: 'tsc -p .',
    dev: 'ts-node-dev --no-notify --respawn --transpile-only src/index'
  };
  const devDependencies: string[] = [
    'typescript',
    '@types/node',
    'ts-node-dev'
  ];

  /**
   * 1. Tạo package.json
   * 2. Tạo tsconfig.json
   * 3. Tạo .prettierrc
   * 4. Tạo gitignore
   * 5. Tạo file: src/index.ts
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
  await mkDir(path.resolve(projectName, 'src'));
  await writeFile(path.resolve(projectName, 'src/index.ts'), '');

  await createPackage(projectName, main, scripts, devDependencies);
  await createTsConfig(projectName);
  await createPrettier(projectName);
  await createGitig(projectName);

  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};
