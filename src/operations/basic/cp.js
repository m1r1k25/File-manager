import fs from 'fs'
import path from 'path'
import { currentDir } from '../../getCommand.js';

const errorText = 'FS operation failed'

export const cp = async (command) => {
  const pathToFileFromConsole = command.split(' ')[1]
  const directoryFromConsole = command.split(' ')[2]
  const pathToFile = pathToFileFromConsole.split(path.sep).length === 1
    ? path.join(currentDir, pathToFileFromConsole)
    : path.join(pathToFileFromConsole)
  const pathToDirectory = directoryFromConsole.split(path.sep).length === 1 
    ? path.join(currentDir, directoryFromConsole)
    : directoryFromConsole
  try {
    await fs.promises.access(pathToFile)
    const newFilePath = path.join(pathToDirectory, pathToFile.split(path.sep).slice(-1)[0])
    await fs.promises.access(newFilePath)
    throw new Error('exist')
  } catch(err) {
    try {
      if(err.message === 'exist') throw new Error(errorText)
      await fs.promises.access(pathToFile)
      const newFilePath = path.join(pathToDirectory, pathToFile.split(path.sep).slice(-1)[0])
      fs.createReadStream(pathToFile).pipe(fs.createWriteStream(newFilePath)).on('error', (err) => {
        console.log(errorText)
      });
    } catch(err) {
      console.log(errorText)
    } 
  }
};