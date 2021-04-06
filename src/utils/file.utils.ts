import { promisify } from 'util';
import fs from 'fs';
import chalk from 'chalk';

const write = promisify(fs.writeFile);
const access = promisify(fs.access);

export const mkDir = promisify(fs.mkdir);

export const writeFile = async (dest: string, content: string) => {
  try {
    await write(dest, content, { encoding: 'utf8' });
    console.log('\t File %s created succesfully!', chalk.green.bold(dest));
  } catch (error) {
    console.log(error);
    process.exit(1); // kết thúc
  }
};

export const isExists = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      // Lỗi khác
      console.error(error);
      return true;
    }
  }
};
