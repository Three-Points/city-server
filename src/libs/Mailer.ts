import nodemailer from 'nodemailer'
import { MAILER_EMAIL, MAILER_PASSWORD } from '@config/env'

export default nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAILER_EMAIL,
        pass: MAILER_PASSWORD,
    },
})
