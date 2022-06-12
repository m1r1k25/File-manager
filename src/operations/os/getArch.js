import {arch} from 'os';
import { currentDir } from '../../index.js';

export const getArch = () => {
  console.log(`Yours processor architecture is ${arch()}`)
  console.log(`You are currently in ${currentDir}`)
}