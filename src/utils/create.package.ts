import { lastest } from './lastversion';
import { writeFile } from './file.utils';
import path from 'path';

class PackageJson {
  name = '';
  version = '';
  main = 'src/index.ts';

  scripts: { [key: string]: string } = {};

  devDependencies: {
    [key: string]: string;
  } = {};

  dependencies: {
    [key: string]: string;
  } = {};

  author = 'tranvd2010 <tranvd2010@gmail.com>';
  homepage = 'https://trankieu.github.io/';
}

export const createPackage = async (
  dir: string,
  main: string,
  scripts: { [key: string]: string },
  devDependencies: string[] = [],
  dependencies: string[] = []
) => {
  const packageJson = new PackageJson();

  packageJson.main = main;
  packageJson.scripts = scripts;
  // lấy dependencies: concurrently, nodemon
  //  packageJson.devDependencies[''] = (await lastest('')) as string;

  for await (const dependency of devDependencies) {
    packageJson.devDependencies[dependency] = (await lastest(
      dependency
    )) as string;
  }

  for await (const dependency of dependencies) {
    packageJson.dependencies[dependency] = (await lastest(
      dependency
    )) as string;
  }

  const pkgF = path.resolve(dir, 'package.json');
  try {
    await writeFile(pkgF, JSON.stringify(packageJson, undefined, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
