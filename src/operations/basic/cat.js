import { createReadStream, readdirSync } from 'fs'
import { join } from 'path';
import { currentDir } from '../../index.js';

export const cat = (input) => {
  const fileName = input.split(' ')[1]
  const filesandDir = readdirSync(currentDir);
 
  if(filesandDir.includes(fileName)) {
    const pathToFile = join(currentDir, fileName)
    const readStream = createReadStream(pathToFile, 'utf-8');
    readStream.on('data', function (chunk) {
      console.log(chunk)
      console.log(`You are currently in ${currentDir}`)
    });
  } else {
    console.log('Invalid input')
    console.log(`You are currently in ${currentDir}`)
  }
}