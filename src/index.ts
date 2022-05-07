import 'module-alias/register'
import { version } from '../package.json'
import { MODE, PORT, DB_URL, SERVER_URL } from '@config/env'

import server from './server'

server.set('MODE', MODE)
server.set('PORT', PORT)
server.set('DB_URL', DB_URL)
server.set('SERVER_URL', SERVER_URL)
server.set('version', version)

server.listen(server.get('PORT'), () => {
    console.log(`⬢ Zentrity - ${server.get('MODE')}`)
    console.log(`◌ Listening Server on ${server.get('SERVER_URL')}/api`)
    console.log(`◌ Listening Database on ${server.get('DB_URL')}`)
    console.log(`◌ v${server.get('version')}`)
})
