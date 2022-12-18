import { promises as fs, createReadStream } from "fs"
import path from "path"
import { createHash } from 'crypto'

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

export const hash = async (command) => {
  const pathFromConsole = command.split(' ')[1]
  try {
    let pathToFile = ''
    if(pathFromConsole.split(path.sep).length === 1) {
      await fs.access(path.join(currentDir, pathFromConsole))
      pathToFile = path.join(currentDir, pathFromConsole)
    } else {
      await fs.access(pathFromConsole)
      pathToFile = path.join(pathFromConsole)
    }
    const text = await fs.readFile(pathToFile) 
    const hash = createHash('sha256').update(text).digest('hex');
    console.log(hash)
  } catch(err) {
    console.log(errorText)
  }
}