import { argv } from 'process'

export const username = argv.slice(2)[0].split('=')[1]