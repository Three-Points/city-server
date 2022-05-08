import UserController from '@controllers/User.controller'
import { TPUser } from '@models/User/User.entity'

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
 * @description Create a user.
 * @param {TPUser} payload Payload to create a user.
 * @returns User. */
export const createUser = (payload: TPUser) => {
    return userController.createUser(payload)
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
