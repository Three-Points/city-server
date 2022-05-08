import bcrypt from 'bcrypt'
import ErrorServer from '@controllers/ErrorServer.controller'
import User from '@models/User/User.model'
import { TQUser, TPUser } from '@models/User/User.entity'

export default class UserController {
    private model = new User()

    /**
     * @description Find users.
     * @param {TQUser} query
     * @returns Users array. */
    async findUsers(query?: TQUser) {
        return await this.model.findMany(query)
    }

    /**
     * @description Find a user.
     * @param {TQUser} query
     * @throws {ErrorServer} User not found.
     * @returns User. */
    async findUser(query: TQUser) {
        const user = await this.model.findUnique(query)
        if (!user) throw new ErrorServer('NOT_FOUND', 'User not found.')
        return user
    }

    /**
     * @description Create a user.
     * @param {string} password
     * @param {TPPost} payload
     * @returns User. */
    async createUser({ password, ...payload }: TPUser) {
        return await this.model.create({
            ...payload,
            password: await bcrypt.hash(password as string, 10),
        })
    }

    /**
     * @description Update a user by id.
     * @param {TQUser} query
     * @param {TPUser} payload
     * @throws {ErrorServer} User not found.
     * @returns User. */
    async updateUser(query: TQUser, payload: TPUser) {
        await this.findUser(query)
        return await this.model.update(query, payload)
    }

    /**
     * @description Delete a user by id.
     * @param {TQUser} query
     * @throws {ErrorServer} User not found.
     * @returns User. */
    async deleteUser(query: TQUser) {
        await this.findUser(query)
        return await this.model.delete(query)
    }
}
