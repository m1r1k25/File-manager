import { promises as fs, createReadStream } from "fs"
import path from "path"

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

export const cat = async (command) => {
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
    const stat = await fs.lstat(pathToFile)
    if(stat.isDirectory()) {
      throw new Error()
    }
    const readStream = createReadStream(pathToFile, 'utf-8');
    readStream.on('data', function (chunk) {
      console.log(chunk)
    });
  } catch(err) {
    console.log(errorText)
  }
}