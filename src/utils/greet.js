import { homedir } from 'os'

export const greet = () => {
  console.log(`Welcome to the File Manager, ${process.argv.slice(2)[0].split('=')[1]}!
  \nYou are currently in ${homedir()}\n`)
} 