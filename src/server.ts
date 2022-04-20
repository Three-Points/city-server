import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swagger from './swagger'
import { MODE, PORT } from '@config/env'
import { version } from '../package.json'

import index from '@routes/index.routes'

import { error } from '@middlewares/response.middleware'

const server = express()

server.set('version', version)
server.set('port', PORT)
server.set('mode', MODE)
server.set('json spaces', 4)

server.use(cors())
server.use(express.json({ limit: '25mb' }))
server.use(express.urlencoded({ limit: '25mb', extended: true }))

server.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swagger))
server.use('/api', index)

server.use(error)

export default server
