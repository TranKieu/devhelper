import chalk from 'chalk';
import packageJson from 'package-json';
import { writeFile } from '../utils/file.utils';

class PackageJson {
  name = '';
  version = '';
  main = 'src/index.ts';

  scripts = {
    build: '',
    compiler: 'tsc -p .'
  };
  devDependencies!: {
    [key: string]: string;
  };
  dependencies:
    | {
        [key: string]: string;
      }
    | undefined;

  author = 'tranvd2010 <tranvd2010@gmail.com>';
  homepage = 'https://trankieu.github.io/';
}

export const createPackage = async (fileName: string) => {
  const packageJson = new PackageJson();

  // lấy dependencies
  //  packageJson.devDependencies[''] = (await lastest('')) as string;
  packageJson.devDependencies['nodemon'] = (await lastest('nodemon')) as string;
  packageJson.devDependencies['concurrently'] = (await lastest(
    'concurrently'
  )) as string;
  packageJson.devDependencies['typescript'] = (await lastest(
    'typescript'
  )) as string;

  try {
    await writeFile(fileName, JSON.stringify(packageJson, undefined, 5));
    console.log('\t File %s created succesfully!', chalk.green.bold(fileName));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const lastest = async (packageName: string) => {
  const { version } = await packageJson(packageName, { version: 'latest' });
  return version;
};
