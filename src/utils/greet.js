import { homedir } from 'os'
import { userName } from '../index.js'

export const greet = () => {
  console.log(`Welcome to the File Manager, ${userName 
  ? process.argv.slice(2)[0].split('=')[1]
  : 'guest'}!
  \nYou are currently in ${homedir()}\n`)
} 