import chalk from 'chalk';

import { writeFile } from '../utils/file.utils';

export const createTsConfig = async (fileName: string) => {
  const tsconfig = {
    compilerOptions: {
      target: 'es2015',
      module: 'CommonJS',
      sourceMap: true,
      removeComments: true,
      outDir: './dist',
      baseUrl: './',
      rootDir: './src',
      strict: true,
      forceConsistentCasingInFileNames: true,
      noImplicitReturns: true,
      declaration: false,
      downlevelIteration: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      moduleResolution: 'node',
      esModuleInterop: true,

      lib: ['es2018', 'dom'],
      typeRoots: ['node_modules/@types']
    },
    exclude: ['node_modules', './dist']
  };

  try {
    await writeFile(fileName, JSON.stringify(tsconfig, undefined, 2));
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
