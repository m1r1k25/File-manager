import { readdirSync, statSync } from 'fs';
import { currentDir } from '../../index.js';

export const getDir = (input) => {
  const dir = input.split(' ')[1]
  const filesandDir = readdirSync(currentDir);

  if(filesandDir.includes(dir)) {
    return dir
  } else {
    return false
  }
}