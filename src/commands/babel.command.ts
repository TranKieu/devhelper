import { writeFile } from '../utils/file.utils';

export const createBabel = async (fileName: string) => {
  const babel = {
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]]
  };

  try {
    await writeFile(fileName, JSON.stringify(babel, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
