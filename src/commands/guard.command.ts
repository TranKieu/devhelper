import path from 'path';
import { writeFile, isExists, guard, mkDir } from '../utils/file.utils';
import chalk from 'chalk';

export const createGuard = async (fpad: string) => {
  const guardfile = fpad + '.guard.ts';

  if (await isExists(guardfile)) {
    console.error(`\t File ${chalk.red(path)} already exist!`);
    process.exit(1);
  }

  const guardPath = path.dirname(fpad);

  if (guardPath !== '.') {
    await mkDir(guardPath);
  }
  const guardName = path.basename(fpad);

  const guardContent = `
  const ${guard(guardName)}: CanActivateFn = (): boolean | UrlTree => {
  
  const Service = inject(Service);
  const router = inject(Router);

  return Service. || router.createUrlTree([ ])
}
`;

  try {
    await writeFile(guardfile, guardContent);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
