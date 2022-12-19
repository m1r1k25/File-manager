import fs from 'fs'
import path from 'path'
import { createBrotliCompress } from 'zlib'
import { currentDir } from '../../getCommand.js' 

import { errorText } from "../../utils/constants.js"

export const compress = (command) => {
  if(command.split(' ').length < 3) return console.log(errorText)
  const pathToFileFromConsole = command.split(' ')[1]
  const directoryFromConsole = command.split(' ')[2]
  const pathToFile = pathToFileFromConsole.split(path.sep).length === 1
    ? path.join(currentDir, pathToFileFromConsole)
    : path.join(pathToFileFromConsole)
  const pathToArchive = directoryFromConsole.split(path.sep).length === 1 
    ? path.join(currentDir, directoryFromConsole)
    : directoryFromConsole
  try {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToArchive);
    const brotli = createBrotliCompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);
    readStream.on('error', () => {
      console.log(errorText)
    });
    writeStream.on('error', () => {
      console.log(errorText)
    })
    stream.on('finish', () => {
      console.log('Done compressing');
    });
  } catch(err) {
    console.log(err.message)
  }
}