import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process'
import { ls } from './operations/navigation/ls.js'
import { up } from './operations/navigation/up.js'
import { username } from './utils/getUsername.js';
import { getDir } from './operations/navigation/getDir.js';
import { join } from 'path'
import { getHomeDir } from './utils/getHomeDir.js';
import { cat } from './operations/basic/cat.js';
import { add } from './operations/basic/add.js';
import { rn } from './operations/basic/rn.js';
import { cp } from './operations/basic/cp.js';
import { mv } from './operations/basic/mv.js';
import { rm } from './operations/basic/rm.js';
import { getEOL } from './operations/os/getEOL.js';
import { getCPUS } from './operations/os/cpus.js';
import { getUsername } from './operations/os/getUsername.js';
import { getArch } from './operations/os/getArch.js';
import { hash } from './operations/hash.js/hash.js';
import { compress } from './operations/compress/compress.js';
import { decompress } from './operations/compress/decompress.js';

const rl = createInterface({ input, output })
export let currentDir = join(getHomeDir);

console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${currentDir}`)

rl.on('line', (input) => {
  if(input === 'up') {
    return up(currentDir)
  }
  if(input.slice(0, 3) === 'cd ') {
    const dir = getDir(input)
    if(dir) {
      currentDir = join(currentDir, dir)
      console.log(`You are currently in ${currentDir}`)
    } else {
      console.log(`this directory doesn't exist, try to choose another directory`)
      console.log(`You are currently in ${currentDir}`)
    }
    return
  }
  if(input === 'ls') {
    return ls(currentDir)
  }  
  if(input.slice(0, 3) === 'cat') {
    return cat(input)
  }
  if(input.slice(0, 3) === 'add') {
    return add(input)
  }
  if(input.slice(0, 3) === 'rn ') {
    return rn(input)
  }
  if(input.slice(0, 3) === 'cp ') {
    return cp(input)
  }
  if(input.slice(0, 3) === 'mv ') {
    return mv(input)
  }
  if(input.slice(0, 3) === 'rm ') {
    return rm(input)
  }
  if(input.slice(0, 8) === 'os --EOL') {
    return getEOL()
  }
  if(input.slice(0, 9) === 'os --cpus') {
    return getCPUS()
  }
  if(input.slice(0, 12) === 'os --homedir') {
    return console.log(`Your homedir: ${getHomeDir}`)
  }
  if(input.slice(0, 13) === 'os --username') {
    return getUsername()
  }
  if(input.slice(0, 17) === 'os --architecture') {
    return getArch()
  }
  if(input.slice(0, 5) === 'hash ') {
    return hash(input)
  }
  if(input.slice(0, 9) === 'compress ') {
    return compress(input)
  }
  if(input.slice(0,11) === 'decompress ') {
    return decompress(input)
  }

  
  if(input === '.exit') {
    return rl.close()
  } else {
    console.log('Invalid input, try to change command')
    console.log(`You are currently in ${currentDir}`)
  }
}).on('close', () => {
  console.log(`Thank you for using File Manager, ${username}!`)
  process.exit(0);
});
