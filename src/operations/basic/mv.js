import fs from 'fs'
import path from 'path'
import { currentDir } from '../../getCommand.js';

const errorText = 'FS operation failed'

export const mv = async (command) => {
  if(command.split(' ').length < 3) return console.log(errorText)
  const pathToFileFromConsole = command.split(' ')[1]
  const directoryFromConsole = command.split(' ')[2]
  const pathToFile = pathToFileFromConsole.split(path.sep).length === 1
    ? path.join(currentDir, pathToFileFromConsole)
    : path.join(pathToFileFromConsole)
  const pathToDirectory = directoryFromConsole.split(path.sep).length === 1 
    ? path.join(currentDir, directoryFromConsole)
    : directoryFromConsole
  const newFilePath = path.join(pathToDirectory, pathToFile.split(path.sep).slice(-1)[0])
  try {
    await fs.promises.access(pathToFile)
    await fs.promises.access(newFilePath)
    throw new Error('exist')
  } catch(err) {
    try {
      if(err.message === 'exist') throw new Error(errorText)
      await fs.promises.access(pathToFile)
      const readStream = fs.createReadStream(pathToFile)
      const writeStream = fs.createWriteStream(newFilePath)
      readStream.on('close', () => {
        fs.promises.unlink(pathToFile);
      });
      readStream.on('error', () => {
        console.log(errorText)
      });
      writeStream.on('error', () => {
        console.log(errorText)
      })
      readStream.pipe(writeStream);
    } catch(err) {
      console.log(errorText)
    } 
  }
}