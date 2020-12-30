import { createGitig } from './gitig.command';
import { createPackage } from './package.command';
import { createPrettier } from './prettier.command';

export const initTs = () => {
  /**
   * 1. Tạo package.json
   * 2. Tạo tsconfig.json
   * 3. Tạo .prettierrc
   * 4. Tạo gitignore
   */
  createPackage('package.json');
  createPackage('tsconfig.json');
  createPrettier('.prettierrc');
  createGitig('.gitignore');
};
