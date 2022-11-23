import chalk from 'chalk';
import path from 'path';
import { copyDir, isExists, writeFile } from '../utils/file.utils';
import { createPackage } from '../utils/create.package';
import { createGitig } from './gitig.command';
import { createPrettier } from './prettier.command';

const tailwindArr: Array<string> = [
  '@tailwind base;',
  '@tailwind components;',
  '@tailwind utilities;',
  '@layer base {  html {   height: 100%;  }}'
];

const tailwindConfig = {
  content: ['./public/**/*.{html,js}'],

  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};

export const tailwind = async (projectName: string) => {
  /** package */
  const main = 'public/index.html';
  const scripts = {
    watch: 'tailwindcss -i ./tailwind.css -o ./public/style.css --watch'
  };
  // build: 'postcss ./src/tailwind.css -o ./public/css/styles.css --verbose',
  // prod: 'postcss ./src/tailwind.css -o ./public/css/styles.css --env production --verbose'

  const devDependencies: string[] = [
    // 'autoprefixer',
    'tailwindcss'
    // 'postcss-cli',
    // 'cssnano'
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

  // tailwind.config.js
  const configInhalt =
    'module.exports =' + JSON.stringify(tailwindConfig, undefined, 2);
  const configFile = path.resolve(projectName, 'tailwind.config.js');
  await writeFile(configFile, configInhalt);
  // tailwind.css await writeFile
  const cssFile = path.resolve(projectName, 'tailwind.css');

  const cssInhalt = tailwindArr.join('\n');
  await writeFile(cssFile, cssInhalt);
  // packageprojectName
  await createPackage(projectName, main, scripts, devDependencies);
  await createPrettier(projectName);
  await createGitig(projectName);
  console.log('\t %s Project ready!\n', chalk.green.bold(projectName));
};
