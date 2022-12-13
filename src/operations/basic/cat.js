import { promises as fs, createReadStream } from "fs"
import path from "path"

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

export const cat = async (command) => {
  try {
    const pathName = command.split(' ')[1]
    if(pathName === path.join(currentDir, pathName.split(path.sep).slice(-1)[0]) 
    || pathName === pathName.split(path.sep).slice(-1)[0]) {
      const fileName = pathName === path.join(currentDir, pathName.split(path.sep).slice(-1)[0]) 
      ? pathName 
      : path.join(currentDir, pathName.split(path.sep).slice(-1)[0])
      const stat = await fs.lstat(fileName)
      if(stat.isDirectory()) {
        throw new Error()
      }
      const readStream = createReadStream(fileName, 'utf-8');
      readStream.on('data', function (chunk) {
        console.log(chunk)
      });
    } else {
      throw new Error()
    }
  } catch(err) {
    console.log(errorText)
  }
}
