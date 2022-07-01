import { existsSync } from 'fs';
import { join, resolve, sep } from 'path';
import { rename } from 'fs/promises';
import { currentDir } from '../../index.js';

export const rn = async (input) => {
  const pathToFile = input.split(' ')[1]
  const pathToFileToArray = pathToFile.split(sep)
  let pathToWrongFile = ''
  if(pathToFileToArray.length === 1) {
    pathToWrongFile = join(currentDir, pathToFile);
  } else {
    pathToWrongFile = resolve(pathToFileToArray.join(sep))
  }

  const pathToNewFile = input.split(' ')[2]
  const pathToNewFileToArray = pathToNewFile.split(sep)
  let pathToProperFile = ''
  if(pathToFileToArray.length === 1) {
    pathToProperFile = join(currentDir, pathToNewFile);
  } else {
    pathToProperFile = resolve(pathToNewFileToArray.join(sep))
  }

  try {
      if(!existsSync(pathToWrongFile) || existsSync(pathToProperFile)) {
          throw new Error('FS operation failed')
      }
      await rename(pathToWrongFile, pathToProperFile);
      console.log('file has renamed successfully')
      console.log(`You are currently in ${currentDir}\n`)
  } catch(err) {
      console.log(err.message)
      console.log(`You are currently in ${currentDir}`)
  }
}
