import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config()
dotenvExpand(env)

export const PORT = process.env.PORT
export const MODE = process.env.MODE || process.env.NODE_ENV

export const SERVER_URL = process.env.SERVER_URL
