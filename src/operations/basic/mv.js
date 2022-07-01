import { createReadStream, createWriteStream, existsSync } from 'fs'
import { unlink } from 'fs/promises';
import { join, resolve, sep } from 'path'
import { currentDir } from '../../index.js';

export const mv = async (input) => {
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
        console.log('It is not possible to move this file, because it may exists in the target directory, or the file you specified does not exist at all')
        console.log(`You are currently in ${currentDir}`)
    } else {
      const readStream = createReadStream(pathToWrongFile)
      const writeStream = createWriteStream(pathToProperFile)
      console.log('file has moved successfully')
      console.log(`You are currently in ${currentDir}`)
      readStream.on('close', function () {
        unlink(pathToWrongFile);
      });
      readStream.pipe(writeStream);
    }

  } catch(err) {
      console.log(err.message)
      console.log(`You are currently in ${currentDir}`)
  }
}