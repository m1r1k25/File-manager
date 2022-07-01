import { join, sep } from 'path'

export const up = (currentDir) => {
  const allPathInArray = join(currentDir).split(sep)
  allPathInArray.pop()
  const upperDir = allPathInArray.join(sep)
  console.log(upperDir)
  console.log(`You are currently in ${currentDir}`)
}
