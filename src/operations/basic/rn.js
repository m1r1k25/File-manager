import { promises as fs, createReadStream } from "fs"
import path from "path"

import { currentDir } from "../../getCommand.js"

import { errorText } from "../../utils/constants.js"

//TODO: not completed
export const rn = async (command) => {
  const pathName = command.split(' ')[1]
  const newFileName = command.split(' ')[2]
  try {
    if(pathName === path.join(currentDir, pathName.split(path.sep).slice(-1)[0]) 
    || pathName === pathName.split(path.sep).slice(-1)[0]) {
      const fileName = pathName === path.join(currentDir, pathName.split(path.sep).slice(-1)[0]) 
      ? pathName 
      : path.join(currentDir, pathName.split(path.sep).slice(-1)[0])
      try {
        await fs.access(path.join(pathName, '..', newFileName))
        throw new Error(errorText);
      } catch(err) {
          try {
              if(err.message === errorText) throw new Error(errorText);
              await fs.access(fileName)
              await fs.rename(fileName, path.join(fileName, '..', newFileName));
              console.log('Files had been renamed succesfully')
          }
          catch {
              throw new Error()    
          }
      } 
    } else {
      throw new Error()
    }
  } catch(err) {
    console.log(err.message)
    console.log(errorText)
  }
}