import Crypto from 'cryptr'
import { ENCRYPT_TOKEN } from '@config/env'

const crypto = new Crypto(ENCRYPT_TOKEN as string)

/**
 * @description Encrypts an email.
 * @param {string} email
 * @returns {string} Encrypted email */
export const encrypt = (email: string) => crypto.encrypt(email)

/**
 * @description Decrypts a message.
 * @param {string} message
 * @returns {string} Decrypted message */
export const decrypt = (message: string) => crypto.decrypt(message)
