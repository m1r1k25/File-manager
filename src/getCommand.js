import fs from 'fs/promises'
import { homedir } from 'os';
import { join } from 'path';

import { ls } from "./operations/navigation/ls.js"
import { cat } from './operations/basic/cat.js'

import { errorText } from './utils/constants.js';

export let currentDir = join(homedir());

export const getCommand = async (command) => {
  //navigation
  if(command === 'ls') return ls()
  if(command === 'up') {
    if(currentDir === homedir()) return
    return currentDir = join(currentDir, '..')
  }
  if(command.slice(0, 3) === 'cd ') {
    try {
      const newPath = join(currentDir, command.split(' ')[1])
      const stat = await fs.lstat(newPath)
      if(stat.isFile()) {
        throw new Error('You have choosed a file. Please, choose folder')
      }
      await fs.access(newPath)
      currentDir = newPath
      console.log(`You are currently in ${newPath} \n`)
    } 
    catch(err) {
      console.log(errorText)
      console.log(err.message)
      console.log(`You are currently in ${currentDir} \n`)
    }
    return 
  } 

  //basic
  if(command.slice(0, 4) === 'cat ') return cat(command)

  if(command === '.exit') return
  console.log('Invalid input, try to change command \n')
}