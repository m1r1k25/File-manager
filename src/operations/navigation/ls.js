import fs from 'fs/promises'
import { join } from 'path'
import { currentDir } from '../../getCommand.js'

import { errorText } from '../../utils/constants.js'

export const ls = async () => {
  try {
    let directories = []
    let files = [] 
    await fs.access(currentDir)
    const list = await fs.readdir(currentDir)
    for (let i=0; i < list.length; i++) {
      const stat = await fs.lstat(join(currentDir, list[i]))
      if(stat.isFile()) {
        files = [...files, {Name: list[i], Type: 'file'}]
        
      } else {
        directories = [...directories, {Name: list[i], Type: 'directory'}]
      }
    }
      console.table([...directories, ...files])
    } 
    catch(err) {
      console.log(err.message)
    }
}