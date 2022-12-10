import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process'
import { homedir } from 'os';
import { join } from 'path';

import { getCommand } from './getCommand.js';
import { greet } from './utils/greet.js';

export let currentDir = join(homedir());

const rl = createInterface({ input, output });

const userName = process.argv.slice(2)[0].split('=')[1]

greet()

rl.on('line', (command) => {
  getCommand(command)
  if(command === '.exit') rl.close()
}).on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`)
  process.exit(0);
});