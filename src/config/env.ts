import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config()
dotenvExpand(env)

export const MODE = process.env.MODE || process.env.NODE_ENV
export const PORT = process.env.PORT
export const JWT_TOKEN = process.env.JWT_TOKEN
export const ENCRYPT_TOKEN = process.env.ENCRYPT_TOKEN
export const MAILER_EMAIL = process.env.MAILER_EMAIL
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD

export const DB_URL = process.env.DB_URL
export const SERVER_URL = process.env.SERVER_URL
