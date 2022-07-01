import { readdirSync } from 'fs';

export const ls = (currentDir) => {
  const filesandDir = readdirSync(currentDir);
    for (let i=0; i < filesandDir.length; i++) {
        console.log(filesandDir[i]);
    }
  console.log(`\nYou are currently in ${currentDir}`)
}
