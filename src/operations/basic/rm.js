import fs from 'fs'
import path from 'path'

import { currentDir } from '../../getCommand.js'
import { errorText } from '../../utils/constants.js'

export const rm = async (command) => {
  try {
    const pathToFileFromConsole = command.split(' ')[1]
    const pathToFile = pathToFileFromConsole.split(path.sep).length === 1
      ? path.join(currentDir, pathToFileFromConsole)
      : path.join(pathToFileFromConsole)
    await fs.promises.access(pathToFile)
    fs.promises.unlink(pathToFile)
  } catch(err) {
    console.log(errorText)
  }
}