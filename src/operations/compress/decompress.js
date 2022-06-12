import { createReadStream, createWriteStream, existsSync } from 'fs'
import { join, resolve, sep } from 'path'
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { currentDir } from '../../index.js';

export const decompress = (input) => {
  try { 
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

    const readStream = createReadStream(pathToWrongFile );
    const writeStream = createWriteStream(pathToProperFile);

    const brotli = createBrotliDecompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done decompressing');
      console.log(`You are currently in ${currentDir}`)
    })
  } catch(err) {
    console.log('Operation failed. Maybe you has choosed wrong file or choosed wrond directory')
    console.log(`You are currently in ${currentDir}`)
  }
}