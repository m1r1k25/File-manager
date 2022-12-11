import fs from 'fs/promises'
import { currentDir } from '../../utils/currentDir.js'

const errorText = 'FS operation failed'

export const ls = async (currentDir) => {
  try {
    let result = []
    await fs.access(currentDir)
    const list = await fs.readdir(currentDir)
    for (let i=0; i < list.length; i++) {
      const stat = await fs.lstat(currentDir);
      result = [...result, {Name: list[i], Type: stat.isFile() ? 'file' : 'directory'}]
    }
    console.table(result)
    } 
    catch(err) {
      console.log(errorText)
    }
}