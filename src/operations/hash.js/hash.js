import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, resolve, sep } from 'path';
import { currentDir } from '../../index.js';

export const hash = (input) => {
  const pathToFile = input.split(' ')[1]
  const pathToFileToArray = pathToFile.split(sep)
  let pathToWrongFile = ''
  if(pathToFileToArray.length === 1) {
    pathToWrongFile = join(currentDir, pathToFile);
  } else {
    pathToWrongFile = resolve(pathToFileToArray.join(sep))
  }
  const fd = createReadStream(pathToWrongFile);
  const hash = createHash('sha1');
  hash.setEncoding('hex');

  fd.on('error', () => {
    console.log('Invalid input, maybe this file does noe exist')
  })

  fd.on('end', function() {
      hash.end();
      console.log(hash.read());
      console.log(`You are currently in ${currentDir}`)
  });
  fd.pipe(hash);
  
}
