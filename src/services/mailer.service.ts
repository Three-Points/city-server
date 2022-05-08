import mailer from '@libs/Mailer'
import { MAILER_EMAIL, SERVER_URL } from '@config/env'
import ErrorServer from '@controllers/ErrorServer.controller'
import { encrypt } from '@utils/crypter.util'
import { complete } from '@utils/logger.util'

/**
 * @description Send verification email to user email.
 * @param {string} email
 * @throws {ErrorServer} SERVER */
export const sendVerificationEmail = async (email: string) => {
    const token = encrypt(email)
    await mailer.sendMail(
        {
            from: MAILER_EMAIL,
            to: email,
            subject: 'Verify your email',
            text: `${SERVER_URL}/api/verify?token=${token}`,
        },
        (error, info) => {
            if (error) throw new ErrorServer('SERVER', error.message)
            complete(`Email sent: ${info.response}`)
        }
    )
}
