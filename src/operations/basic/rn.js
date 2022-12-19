import { promises as fs, createReadStream } from "fs"
import path from "path"

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

export const rn = async (command) => {
  const pathFromConsole = command.split(' ')[1]
  const newFileName = command.split(' ')[2]
  let pathToFile = ''
  try {
    if(pathFromConsole.split(path.sep).length === 1) {
      await fs.access(path.join(currentDir, pathFromConsole))
      pathToFile = path.join(currentDir, pathFromConsole)
    } else {
      await fs.access(pathFromConsole)
      pathToFile = path.join(pathFromConsole)
    }
    await fs.access(pathToFile, '..', newFileName)
    throw new Error(errorText);
  } catch(err) {
    try {
      if(err.message === errorText) throw new Error(errorText);
      await fs.rename(pathToFile, path.join(pathToFile, '..', newFileName));
      console.log('Files had been renamed succesfully')
    } catch(err) {
      console.log(errorText)   
    }
  }
}