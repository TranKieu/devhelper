import { promisify } from 'util';
import fs from 'fs';

const write = promisify(fs.writeFile);

export const writeFile = async (dest: string, content: string) => {
  try {
    await write(dest, content, { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
    process.exit(1); // kết thúc
  }
};
