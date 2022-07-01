import {userInfo} from 'os'
import { currentDir } from '../../index.js'

export const getUsername = () => {
  const username = userInfo().username
  console.log(`Your username: ${username}`)
  console.log(`You are currently in ${currentDir}`)
}