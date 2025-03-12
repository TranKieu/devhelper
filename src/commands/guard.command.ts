import path from 'path';
import {
  writeFile,
  isExists,
  createGuardName,
  mkDir
} from '../utils/file.utils';
import chalk from 'chalk';

export const createGuard = async (fpad: string, options: any) => {
  const guardfile = fpad + '.guard.ts';

  if (await isExists(guardfile)) {
    console.error(`\t File ${chalk.red(path)} already exist!`);
    process.exit(1);
  }

  const guardPath = path.dirname(fpad);

  if (guardPath !== '.') {
    await mkDir(guardPath);
  }
  const guardName = createGuardName(path.basename(fpad));

  let content = '';
  if (Object.keys(options).length !== 0) {
    if (options.macht) {
      content = canAuth(guardName, 'CanMatchFn');
    }
    if (options.deactivate) {
      content = canDeactivate(guardName);
    }
  } else {
    content = canAuth(guardName);
  }
  try {
    await writeFile(guardfile, content);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const canAuth = (guardName: string, can = 'CanActivateFn') => {
  return `
  export const ${guardName}: ${can} = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean> => {
  
      const Service = inject(Service);
      const router = inject(Router);
  
      return Service. || router.createUrlTree([ ])
    }`;
};

const canDeactivate = (guardName: string) => {
  return ` 
    export interface SafeDeactivate {
      canBeDeactivated(
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
      ): boolean | Observable<boolean>;
    }

    export const ${guardName}: CanDeactivateFn<SafeDeactivate> = (
      component: SafeDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
    ): boolean | Observable<boolean> => {
      return component.canBeDeactivated(currentRoute, currentState, nextState);
    };
  `;
};
