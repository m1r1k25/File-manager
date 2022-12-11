import { ls } from "./operations/navigation/ls.js"
import { currentDir } from "./utils/currentDir.js"

export const getCommand = (command) => {
  if(command === 'ls') {
    ls(currentDir)
    return
  }
  if(command === '.exit') return
  console.log('Invalid input, try to change command \n')
}