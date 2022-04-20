import swaggerJsdoc from 'swagger-jsdoc'

import { version, description } from '../package.json'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: description,
            version,
        },
    },
    apis: ['./docs/**/*.yml'],
}

export default swaggerJsdoc(options)
