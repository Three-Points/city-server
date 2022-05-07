import swaggerJsdoc from 'swagger-jsdoc'

import { version, name } from '../package.json'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: name,
            version,
        },
    },
    apis: ['./docs/**/*.yml'],
}

export default swaggerJsdoc(options)
