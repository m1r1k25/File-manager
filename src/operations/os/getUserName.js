import {userInfo} from 'os'

export const getUserName = () => console.log(`Your username: ${userInfo().username}`)