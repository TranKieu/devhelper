import chalk from 'chalk';
import { writeFile } from '../utils/file.utils';

export const createBabel = async (fileName: string) => {
  const babel = {
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]]
  };

  try {
    await writeFile(fileName, JSON.stringify(babel, undefined, 5));
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
