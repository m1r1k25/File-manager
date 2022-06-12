import { existsSync } from 'fs'
import { unlink } from 'fs/promises';
import { join, resolve, sep } from 'path'
import { currentDir } from '../../index.js';

export const rm = (input) => {
  try {
    const pathToFile = input.split(' ')[1]
    const pathToFileToArray = pathToFile.split(sep)
    let pathToWrongFile = ''
    if(pathToFileToArray.length === 1) {
      pathToWrongFile = join(currentDir, pathToFile);
    } else {
      pathToWrongFile = resolve(pathToFileToArray.join(sep))
    }
    if(!existsSync(pathToWrongFile)) {
        console.log(`This file doesn't exist`)
        console.log(`You are currently in ${currentDir}`)
    } else {
      unlink(pathToWrongFile);
      console.log('file has remove successfully')
      console.log(`You are currently in ${currentDir}`)
    }
  } catch(err) {
      console.log(err.message)
      console.log(`You are currently in ${currentDir}`)
  }
}