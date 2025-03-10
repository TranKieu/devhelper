import path from 'path';
import {
  writeFile,
  isExists,
  createGuardName,
  mkDir
} from '../utils/file.utils';
import chalk from 'chalk';

export const createGuard = async (fpad: string, options = 'active') => {
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
  switch (options) {
    case 'macht':
      content = canMacht(guardName);
      break;
    case 'deactivate':
      content = canDeactivate(guardName);
      break;
    default:
      content = canActivate(guardName);
      break;
  }

  try {
    await writeFile(guardfile, content);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const canActivate = (guardName: string) => {
  return `
  export const ${guardName}: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean> => {
  
      const Service = inject(Service);
      const router = inject(Router);
  
      return Service. || router.createUrlTree([ ])
    }`;
};
const canMacht = (guardName: string) => {
  return ` 
  export const ${guardName}: CanMatchFn = (
    next: Route,
    segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean> => {
        
      const Service = inject(Service);
      const router = inject(Router);
  
      return Service. || router.createUrlTree([ ])
  }`;
};

const canDeactivate = (guardName: string) => {
  return ` 
  export const ${guardName}: CanDeactivateFn<T> = (
      component: T,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean> => {
          
      return of(true);
  }
  `;
};
