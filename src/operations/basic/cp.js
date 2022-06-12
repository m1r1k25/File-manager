import { createReadStream, createWriteStream, existsSync } from 'fs'
import { join, resolve, sep } from 'path'
import { currentDir } from '../../index.js';

export const cp = (input) => {
  try {
    const pathToFile = input.split(' ')[1]
    const pathToFileToArray = pathToFile.split(sep)
    let pathToWrongFile = ''
    if(pathToFileToArray.length === 1) {
      pathToWrongFile = join(currentDir, pathToFile);
    } else {
      pathToWrongFile = resolve(pathToFileToArray.join(sep))
    }
  
    const filename = input.split(' ')[1].split(sep).pop()
    const pathToProperFile = join(input.split(' ')[2], filename)
    
    if(!existsSync(pathToWrongFile) || existsSync(pathToProperFile)) {
        console.log('This file already exists')
    } else {
      createReadStream(pathToWrongFile).pipe(createWriteStream(pathToProperFile));
      console.log('file has coppied successfully')
      console.log(`You are currently in ${currentDir}\n`)
    }

  } catch(err) {
      console.log('Invalid Input')
      console.log(`You are currently in ${currentDir}`)
  }
}