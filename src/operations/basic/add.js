import { currentDir } from "../../index.js";
import { join } from 'path';
import { existsSync, writeFile, constants } from "fs";

export const add = (input) => {
  const fileName = input.split(' ')[1]
  const pathToFile = join(currentDir, fileName)
  try {
    if(!existsSync(pathToFile, constants.F_OK)){
      writeFile(pathToFile, '', (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("File written successfully");
            console.log(`You are currently in ${currentDir}`)
        }
      })   
    } else {
        throw new Error('FS operation failed')
    }
  } catch(err) {
      console.log(err.message)
      console.log(`You are currently in ${currentDir}`)
  }
}