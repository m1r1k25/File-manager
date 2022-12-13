import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process'

import { getCommand } from './getCommand.js';
import { greet } from './utils/greet.js';
import { currentDir } from './getCommand.js';
const rl = createInterface({ input, output });

const userName = process.argv.slice(2)[0].split('=')[1]

greet()

rl.on('line', (command) => {
  getCommand(command)
  if(command.slice(0, 3) !== 'cd ') {
    console.log(`You are currently in ${currentDir}`, '\n')
  }
  if(command === '.exit') rl.close()
}).on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`)
  process.exit(0);
});