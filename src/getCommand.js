import fs from 'fs/promises'
import { homedir } from 'os';
import { join } from 'path';

import { ls } from './operations/navigation/ls.js'

import { cat } from './operations/basic/cat.js'
import { add } from './operations/basic/add.js';
import { rn } from './operations/basic/rn.js';
import { cp } from './operations/basic/cp.js';
import { mv } from './operations/basic/mv.js';

import { getEOL } from './operations/os/getEOL.js';
import { getCPUS } from './operations/os/getCPUS.js';
import { getHomeDir } from './operations/os/getHomeDir.js';
import { getUserName } from './operations/os/getUserName.js';
import { getArchitecture } from './operations/os/getArchitecture.js';

import { hash } from './operations/hash/hash.js';

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
        throw new Error()
      }
      await fs.access(newPath)
      currentDir = newPath
      console.log(`You are currently in ${newPath} \n`)
    } 
    catch(err) {
      console.log(errorText)
      console.log(`You are currently in ${currentDir} \n`)
    }
    return 
  } 

  //basic
  if(command.slice(0, 4) === 'cat ') return cat(command)
  if(command.slice(0, 4) === 'add ') return add(command)
  if(command.slice(0, 3) === 'rn ') return rn(command)
  if(command.slice(0, 3) === 'cp ') return cp(command)
  if(command.slice(0, 3) === 'mv ') return mv(command)

  //os
  if(command.slice(0, 8) === 'os --EOL') return getEOL()
  if(command.slice(0, 9) === 'os --cpus') return getCPUS()
  if(command.slice(0, 12) === 'os --homedir') return getHomeDir()
  if(command.slice(0, 13) === 'os --username') return getUserName()
  if(command.slice(0, 17) === 'os --architecture') return getArchitecture()

  //hash
  if(command.slice(0, 5) === 'hash ') return hash(command)

  if(command === '.exit') return
  
  console.log('Invalid input, try to change command \n')
}