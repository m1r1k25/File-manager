import {EOL} from 'os'
import { currentDir } from '../../index.js'

export const getEOL = () => {
  console.log(JSON.stringify(EOL))
  console.log(`You are currently in ${currentDir}`)
}