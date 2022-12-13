import { promises as fs, createReadStream } from "fs"
import path from "path"

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

export const add = async (command) => {
  const fileName = command.split(' ')[1]
  const pathToFile = path.join(currentDir, fileName)
  try {
    await fs.access(pathToFile);
    throw new Error(errorText);
  } catch(err) {
    try {
      if(err.message === errorText) throw new Error(errorText)
      await fs.writeFile(pathToFile, '')
      console.log('File has been created')
    } catch(err) {
      console.log(errorText)  
    }
  }
}