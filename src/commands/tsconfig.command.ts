import path from 'path';
import { writeFile } from '../utils/file.utils';

export const createTsConfig = async (dir: string) => {
  const tsconfig = {
    compilerOptions: {
      target: 'es2020',
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

      lib: ['es2020', 'dom'],
      typeRoots: ['node_modules/@types']
    },
    exclude: ['node_modules', './dist']
  };

  const configF = path.resolve(dir, 'tsconfig.json');
  try {
    await writeFile(configF, JSON.stringify(tsconfig, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
