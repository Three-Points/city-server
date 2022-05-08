import UserController from '@controllers/User.controller'
import { TPUser } from '@models/User/User.entity'
import { sendVerificationEmail } from '@services/mailer.service'
import { decrypt } from '@utils/crypter.util'

const userController = new UserController()

/**
 * @description Find all users paginated.
 * @param {number} [page] Optional page number.
 * @returns User array. */
export const getUsers = (page?: number) => {
    return userController.findUsers({ page })
}

/**
 * @description Find user by id.
 * @param {number} id User id.
 * @returns User. */
export const getUserById = (id: number) => {
    return userController.findUser({ id })
}

/**
 * @description Create a user and send a verification email.
 * @param {TPUser} payload Payload to create a user.
 * @returns User. */
export const createUser = async (payload: TPUser) => {
    const user = await userController.createUser(payload)
    await sendVerificationEmail(user.email)
    return user
}

/**
 * @description Update a user.
 * @param {number} id User id.
 * @param {TPUser} payload Payload to create a user.
 * @returns Post. */
export const updateUser = (id: number, payload: TPUser) => {
    return userController.updateUser({ id }, payload)
}

/**
 * @description Delete a post.
 * @param {number} id Post id.
 * @returns Post. */
export const deleteUser = (id: number) => {
    return userController.deleteUser({ id })
}

/**
 * @description Active a user by id.
 * @param {string} token Encrypted token.
 * @returns Post. */
export const activeUser = (token: string) => {
    const email = decrypt(token)
    return userController.updateUser({ email }, { active: true })
}
