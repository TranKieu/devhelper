import packageJson from 'package-json';

export const lastest = async (packageName: string) => {
  const { version } = await packageJson(packageName, { version: 'latest' });
  return version;
};
