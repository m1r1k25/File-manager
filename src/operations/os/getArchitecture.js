import {arch} from 'os'

export const getArchitecture = () => console.log(`Yours processor architecture is ${arch()}`)