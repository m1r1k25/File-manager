import {cpus} from 'os'
import { currentDir } from '../../index.js'

export const getCPUS = () => {
  const cpuData = cpus()
  console.log(cpuData)
  console.log(`You are currently in ${currentDir}`)
}