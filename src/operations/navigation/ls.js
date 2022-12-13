import fs from 'fs/promises'
import { join } from 'path'
import { currentDir } from '../../getCommand.js'

import { errorText } from '../../utils/constants.js'

export const ls = async () => {
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
      console.log(err.message)
    }
}