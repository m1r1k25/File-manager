import fs from 'fs/promises'
import { join } from 'path'

import { errorText } from '../../utils/constants.js'

export const ls = async (currentDir) => {
  try {
    let result = []
    await fs.access(currentDir)
    const list = await fs.readdir(currentDir)
    for (let i=0; i < list.length; i++) {
      const stat = await fs.lstat(join(currentDir, list[i]))
      result = [...result, {Name: list[i], Type: stat.isFile() ? 'file' : 'directory'}]
    }
      console.table(result)
    } 
    catch(err) {
      console.log(errorText)
      console.log(err.message)
    }
}