import { lastest } from '../utils/lastversion';
import { writeFile } from '../utils/file.utils';

class PackageJson {
  name = '';
  version = '';
  main = 'src/index.ts';

  scripts = {
    start: 'node dist/index',
    build: 'tsc -p .',
    dev: 'ts-node-dev --no-notify --respawn --transpile-only src/index'
  };

  devDependencies: {
    [key: string]: string;
  } = {};

  dependencies: {
    [key: string]: string;
  } = {};

  author = 'tranvd2010 <tranvd2010@gmail.com>';
  homepage = 'https://trankieu.github.io/';
}

export const createPackage = async (fileName: string) => {
  const packageJson = new PackageJson();

  // lấy dependencies: concurrently, nodemon
  //  packageJson.devDependencies[''] = (await lastest('')) as string;
  packageJson.devDependencies['typescript'] = (await lastest(
    'typescript'
  )) as string;
  packageJson.devDependencies['@types/node'] = (await lastest(
    '@types/node'
  )) as string;
  packageJson.devDependencies['ts-node-dev'] = (await lastest(
    'ts-node-dev'
  )) as string;

  try {
    await writeFile(fileName, JSON.stringify(packageJson, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
